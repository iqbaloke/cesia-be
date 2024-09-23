import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthPayloadData } from 'src/dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/dto/guards/jwt.guard';
import { Request } from 'express';
import { TokenService } from '../token/token.service';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/user_entity';

interface UserInterface {
  id: number;
}

interface CustomRequest extends Request {
  user?: UserInterface; // Menentukan tipe user
}

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repos: Repository<User>,
    private readonly user: AuthService,
    private tokenService: TokenService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  async login(@Body() authPayload: AuthPayloadData) {
    return this.user.login(authPayload);
  }

  @Get('status')
  status(@Req() req: Request) {
    req.user;
    return req.user;
  }

  @Post('logout')
  async logout(@Req() req: CustomRequest) {
    const userId = req.user?.id;
    const users = await this.repos.findOne({
      where: {
        id: userId,
      },
    });

    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      this.tokenService.addTokenToBlacklist(token);
      users.token = null;
      this.repos.save(users);
      return { message: 'Successfully logged out' };
    }
    return { message: 'No token provided' };
  }
}
