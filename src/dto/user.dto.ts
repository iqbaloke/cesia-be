import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  username: string;

  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  password: string;

  @IsNotEmpty({ message: 'Role tidak boleh kosong' })
  user_role: string;
}

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  user_role?: string;
}
