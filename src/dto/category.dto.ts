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
  name: number;

  @IsNotEmpty({ message: 'Jenis tidak boleh kosong' })
  jenis: number;

  @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
  kota: number;

  @IsNotEmpty({ message: 'Provinsi tidak boleh kosong' })
  provinsi: string;

  @IsNotEmpty({ message: 'Pusat tidak boleh kosong' })
  pusat: string;


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

  @IsOptional()
  kota?: number;

  @IsOptional()
  provinsi?: number;

  @IsOptional()
  pusat?: number;

}
