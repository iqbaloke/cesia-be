import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubCategory {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @IsNotEmpty({ message: 'Categori tidak boleh kosong' })
  category_id: number;
}

export class UpdateSubCategory {
  @IsOptional()
  name?: string;

  @IsOptional()
  category_id?: number;
}
