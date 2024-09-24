import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAllocation {
  @IsNotEmpty({ message: 'Kategori tidak boleh kosong' })
  category_id: string;

  @IsNotEmpty({ message: 'District tidak boleh kosong' })
  district_id: number;

  @IsNotEmpty({ message: 'Nilai tidak boleh kosong' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Price must be a valid number' },
  )
  nilai: number;

  @IsDate()
  @IsNotEmpty({ message: 'Date tidak boleh kosong' })
  date?: Date;

}

export class UpdateAllocation {
  @IsOptional()
  category_id: string;

  @IsOptional()
  district_id: number;

  @IsOptional()
  nilai: number;

  @IsOptional()
  date: number;

}
