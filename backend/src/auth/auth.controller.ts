import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: AuthSignupDto) {
    return this.authService.signupUser(dto);
  }

  @Post('resend-confirmation')
  @HttpCode(HttpStatus.OK)
  resendConfirmationCode(@Body() email: string) {
    return this.authService.resendConfirmationCode(email);
  }

  @Post('confirm-signup')
  @HttpCode(HttpStatus.OK)
  confirmSignup(@Body() body: { email: string; code: string }) {
    return this.authService.confirmSignup(body.email, body.code);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(accessToken: string) {
    return this.authService.signout(accessToken);
  }
}
