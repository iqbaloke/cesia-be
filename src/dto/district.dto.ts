import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDistrict {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;
}

export class UpdateDistrict {
  @IsOptional()
  name?: string;
}
