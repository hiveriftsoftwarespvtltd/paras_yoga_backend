import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'lokeshkumar',
    });
  }

  async validate(payload: any) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'vineetvineet8006@gmail.com';
    if (payload.email !== adminEmail) {
      throw new UnauthorizedException('Access denied: invalid administrative token.');
    }
    return { email: payload.email, role: 'admin' };
  }
}
