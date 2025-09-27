import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

export type CognitoUser = JwtPayload & {
  sub: string;
  email?: string;
  [key: string]: unknown;
};

export const GetCurrentUser = createParamDecorator(
  (
    property: string | undefined,
    context: ExecutionContext,
  ): CognitoUser | null => {
    const request = context.switchToHttp().getRequest<{ user?: CognitoUser }>();
    const user = request.user;

    if (!user) return null;

    return property
      ? (user[property as keyof CognitoUser] as unknown as CognitoUser)
      : user;
  },
);
