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

  // @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
  // kota: string;

  // @IsNotEmpty({ message: 'Provinsi tidak boleh kosong' })
  // provinsi: string;

  // @IsNotEmpty({ message: 'Pusat tidak boleh kosong' })
  // pusat: string;

  @IsArray()
  @IsOptional()
  @Type(() => CreateSubCategory)
  subcategory?: CreateSubCategory[];
}

export class UpdateCategory {
  @IsOptional()
  name?: string;

  // @IsOptional()
  // kota?: string;

  // @IsOptional()
  // provinsi?: string;

  // @IsOptional()
  // pusat?: string;
}
