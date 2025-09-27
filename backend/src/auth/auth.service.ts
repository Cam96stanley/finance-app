import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AdminInitiateAuthCommand,
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GlobalSignOutCommand,
  ListUsersCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto, AuthSignupDto } from './dto';

@Injectable()
export class AuthService {
  private client: CognitoIdentityProviderClient;
  private userPoolId: string;
  private clientId: string;

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.client = new CognitoIdentityProviderClient({
      region: this.config.get<string>('AWS_REGION'),
    });
    this.userPoolId = this.config.get<string>('COGNITO_USER_POOL_ID')!;
    this.clientId = this.config.get<string>('COGNITO_CLIENT_ID')!;
  }

  async signupUser(dto: AuthSignupDto) {
    try {
      const command = new SignUpCommand({
        ClientId: this.clientId,
        Username: dto.email,
        Password: dto.password,
        UserAttributes: [
          { Name: 'email', Value: dto.email },
          { Name: 'name', Value: dto.name },
        ],
      });

      await this.client.send(command);

      await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
        },
      });

      return {
        message: `Confirmation code sent to ${dto.email}`,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message ?? 'Error signing up');
      }
      throw new Error('Unknown error signing up');
    }
  }

  async resendConfirmationCode(email: string) {
    const command = new ResendConfirmationCodeCommand({
      ClientId: this.clientId,
      Username: email,
    });
    await this.client.send(command);

    return {
      message: `Confirmation code resent to ${email}`,
    };
  }

  async confirmSignup(email: string, code: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: code,
    });

    await this.client.send(command);

    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        isConfirmed: true,
      },
    });

    return {
      message: 'Email Verified!',
    };
  }

  async login(dto: AuthLoginDto) {
    const lisUsersCommand = new ListUsersCommand({
      UserPoolId: this.userPoolId,
      Filter: `email = "${dto.email}"`,
    });

    const users = await this.client.send(lisUsersCommand);
    if (!users.Users?.length) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const username = users.Users[0].Username!;

    const commmand = new AdminInitiateAuthCommand({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: dto.password,
      },
    });

    try {
      const response = await this.client.send(commmand);

      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      return {
        user,
        tokens: response.AuthenticationResult,
      };
    } catch {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  async signout(accessToken: string) {
    try {
      const command = new GlobalSignOutCommand({
        AccessToken: accessToken,
      });
      await this.client.send(command);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'NotAuthorizedException') {
          throw new UnauthorizedException('Access token is invalid or revoked');
        }
        throw new Error(err.message);
      }
      throw new Error('Unknown error during signout');
    }
  }
}
