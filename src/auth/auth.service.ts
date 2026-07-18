import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateAdmin(email: string, pass: string): Promise<any> {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'vineetvineet8006@gmail.com';
    const adminPass = this.configService.get<string>('ADMIN_PASSWORD') || '123456';

    if (email.toLowerCase() === adminEmail.toLowerCase() && pass === adminPass) {
      return { email: adminEmail, role: 'admin' };
    }
    return null;
  }

  async login(admin: any) {
    const payload = { email: admin.email, sub: 'admin-user' };
    return {
      access_token: this.jwtService.sign(payload),
      email: admin.email,
    };
  }
}
