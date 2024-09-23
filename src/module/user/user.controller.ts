import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Pagination } from 'src/utils/paginate';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { User } from 'src/typeorm/entities/user_entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(
    @Query('paginate') paginate: Pagination = { offset: 0, limit: 20 },
  ): Promise<any> {
    const data = this.userService.allUser(paginate);
    return data;
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<User> {
    return await this.userService.showUser(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true })) 
  async store(@Body() create: CreateUserDto): Promise<any> {
    return await this.userService.createUser(create);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true })) 
  async update(
    @Param('id') id: number,
    @Body() update: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, update);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async destroy(@Param('id') id: number): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
