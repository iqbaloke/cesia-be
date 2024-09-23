import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserProvider } from 'src/provider/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { JwtStrategy } from 'src/dto/strategies/jwt.strategy';
import { LocalStrategy } from 'src/dto/strategies/local.strategy';
import { TokenService } from '../token/token.service';
import { JwtAuthGuard } from 'src/dto/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'iqbalGanteng',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...UserProvider,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
