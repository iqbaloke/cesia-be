import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/module/auth/auth.service';

@Injectable()
// @UseGuards(AuthGuard)
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    
    const user = this.authService.validateUser({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

