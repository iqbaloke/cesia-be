import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { CreateSubCategory } from './sub_category.dto';

export class CreateCategory {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name: string;

  @IsNotEmpty({ message: 'Jenis tidak boleh kosong' })
  jenis: string;


  @IsArray()
  @IsOptional()
  @Type(() => CreateSubCategory)
  subcategory?: CreateSubCategory[];
}

export class UpdateCategory {
  @IsOptional()
  name?: string;


  @IsOptional()
  jenis?: string;

}
