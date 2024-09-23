import { IsEmail, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAllocation {
  @IsNotEmpty({ message: 'Kategori tidak boleh kosong' })
  category_id: string;

  @IsNotEmpty({ message: 'District tidak boleh kosong' })
  district_id: number;

  @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
  kota: string;

  @IsNotEmpty({ message: 'Provinsi tidak boleh kosong' })
  provinsi: string;

  @IsNotEmpty({ message: 'Pusat tidak boleh kosong' })
  pusat: string;
}

export class UpdateAllocation {
  @IsOptional()
  category_id: string;

  @IsOptional()
  district_id: number;

  @IsOptional()
  kota?: string;

  @IsOptional()
  provinsi?: string;

  @IsOptional()
  pusat?: string;
}
