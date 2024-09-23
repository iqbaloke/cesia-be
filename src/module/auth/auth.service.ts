import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadData } from 'src/dto/login.dto';
import { User } from 'src/typeorm/entities/user_entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repos: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credential: AuthPayloadData): Promise<User> {
    const users = await this.repos.findOne({
      where: {
        username: credential.username,
      },
    });

    if (!users) return null;
    return users;
  }

  async login(loginDto: AuthPayloadData) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      id: user.id,
      role: user.user_role,
    };

    user.token = this.jwtService.sign(payload);

    this.repos.save(user);

    return {
      user: user,
    };
  }
}
