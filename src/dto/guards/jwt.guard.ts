import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenService } from 'src/module/token/token.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private tokenService: TokenService) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];
    const path = request.route.path;

    if (path === '/auth') {
      return true;
    }

    // Cek apakah token ada dalam blacklist
    if (token && this.tokenService.isTokenBlacklisted(token)) {
      throw new ForbiddenException('Token is blacklisted'); // Tolak akses jika token dibatalkan
    }

    return super.canActivate(context);
  }
}
