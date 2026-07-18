import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }

    const admin = await this.authService.validateAdmin(email, password);
    if (!admin) {
      throw new UnauthorizedException('Invalid administrative credentials');
    }

    return this.authService.login(admin);
  }
}
