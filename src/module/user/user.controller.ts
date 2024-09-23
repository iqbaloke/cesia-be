import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Pagination } from 'src/utils/paginate';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { User } from 'src/typeorm/entities/user_entity';
import { Repository } from 'typeorm';

interface UserInterface {
  id: number;
  role: string;
}

interface CustomRequest extends Request {
  user?: UserInterface; // Menentukan tipe user
}

@Controller('user')
export class UserController {
  @Inject('USER_REPOSITORY')
  private readonly repos: Repository<User>;
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(
    @Req() req: CustomRequest,
    @Query('paginate') paginate: Pagination = { offset: 0, limit: 20 },
  ): Promise<any> {
    const userId = req.user?.id;
    const users = await this.repos.findOne({
      where: {
        id: userId,
      },
    });

    if (
      users.user_role !== 'AM PPN (Assistant Manager Pajak Pertambahan Nilai)'
    ) {
      throw new ForbiddenException('Akses hanya untuk pengguna super');
    }
    const data = this.userService.allUser(paginate);
    return data;
  }

  @Get(':id')
  async show(
    @Req() req: CustomRequest,
    @Param('id') id: number,
  ): Promise<User> {
    const userId = req.user?.id;
    const users = await this.repos.findOne({
      where: {
        id: userId,
      },
    });

    if (
      users.user_role !== 'AM PPN (Assistant Manager Pajak Pertambahan Nilai)'
    ) {
      throw new ForbiddenException('Akses hanya untuk pengguna super');
    }

    return await this.userService.showUser(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async store(
    @Req() req: CustomRequest,
    @Body() create: CreateUserDto,
  ): Promise<any> {
    const userId = req.user?.id;
    const users = await this.repos.findOne({
      where: {
        id: userId,
      },
    });

    if (
      users.user_role !== 'AM PPN (Assistant Manager Pajak Pertambahan Nilai)'
    ) {
      throw new ForbiddenException('Akses hanya untuk pengguna super');
    }
    return await this.userService.createUser(create);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Req() req: CustomRequest,
    @Param('id') id: number,
    @Body() update: UpdateUserDto,
  ): Promise<User> {
    const userId = req.user?.id;
    const users = await this.repos.findOne({
      where: {
        id: userId,
      },
    });

    if (
      users.user_role !== 'AM PPN (Assistant Manager Pajak Pertambahan Nilai)'
    ) {
      throw new ForbiddenException('Akses hanya untuk pengguna super');
    }

    return await this.userService.updateUser(id, update);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async destroy(
    @Req() req: CustomRequest,
    @Param('id') id: number,
  ): Promise<User> {
    const userId = req.user?.id;
    const users = await this.repos.findOne({
      where: {
        id: userId,
      },
    });

    if (
      users.user_role !== 'AM PPN (Assistant Manager Pajak Pertambahan Nilai)'
    ) {
      throw new ForbiddenException('Akses hanya untuk pengguna super');
    }
    return await this.userService.deleteUser(id);
  }
}
