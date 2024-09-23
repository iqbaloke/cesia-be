import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { User } from 'src/typeorm/entities/user_entity';
import { Pagination } from 'src/utils/paginate';
import response_data from 'src/utils/response_data';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') // inject dari provider
    private readonly repo: Repository<User>, //user adalah model (migration) yang berada di typeorm/entities
  ) {}

  async allUser(paginate: Pagination): Promise<any> {
    const response = await this.repo.findAndCount({
      skip: paginate.offset,
      take: paginate.limit,
    });

    const dataresponse = {
      data: response[0],
      count: response[1],
    };

    return response_data.success(dataresponse);
  }

  async showUser(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(
        response_data.error(400, `User tidak ditemukan`),
      );
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const username = await this.repo.findOne({
      where: { username: createUserDto.username },
    });

    const email = await this.repo.findOne({
      where: { email: createUserDto.email },
    });

    if (username) {
      throw new BadRequestException(
        response_data.error(400, 'Username already exists'),
      );
    }

    if (email) {
      throw new BadRequestException(
        response_data.error(400, 'Email already exists'),
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.repo.create({
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return await this.repo.save(newUser);
  }

  async updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(
        response_data.error(400, `User tidak ditemukan`),
      );
    }
    if (updateUser.password) {
      updateUser.password = await bcrypt.hash(updateUser.password, 10);
    }
    Object.assign(user, updateUser);

    return await this.repo.save(user);
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        response_data.error(400, `User tidak ditemukan`),
      );
    }
    await this.repo.remove(user);

    const dataresponse = {
      message: 'Data Berhasil Dihapus',
      status: 200,
    };

    return response_data.success(dataresponse);
  }
}
