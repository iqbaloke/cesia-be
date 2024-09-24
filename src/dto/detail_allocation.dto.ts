import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDetailAllocation {
  @IsNotEmpty({ message: 'Kategori tidak boleh kosong' })
  category_id: number;

  @IsNotEmpty({ message: 'District tidak boleh kosong' })
  district_id: number;

  @IsNotEmpty({ message: 'Allocation tidak boleh kosong' })
  allocation_id: number;

  @IsNotEmpty({ message: 'Nilai tidak boleh kosong' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Price must be a valid number' },
  )
  nilai: number;

  @IsDate()
  @IsNotEmpty({ message: 'Date tidak boleh kosong' })
  date?: Date;

  @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
  kota: number;

  @IsNotEmpty({ message: 'Provinsi tidak boleh kosong' })
  provinsi: number;

  @IsNotEmpty({ message: 'Pusat tidak boleh kosong' })
  pusat: number;

  @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
  potongan_kota: number;

  @IsNotEmpty({ message: 'Provinsi tidak boleh kosong' })
  potongan_provinsi: number;

  @IsNotEmpty({ message: 'Pusat tidak boleh kosong' })
  potongan_pusat: number;
}

export class UpdateDetailAllocation {
  @IsOptional()
  category_id?: number;

  @IsOptional()
  allocation_id?: number;

  @IsOptional()
  district_id?: number;

  @IsOptional()
  nilai?: number;

  @IsOptional()
  date?: number;

  @IsOptional()
  kota?: number;

  @IsOptional()
  provinsi?: number;

  @IsOptional()
  pusat?: number;

  @IsOptional()
  potongan_kota?: number;

  @IsOptional()
  potongan_provinsi?: number;

  @IsOptional()
  potongan_pusat?: number;
}
