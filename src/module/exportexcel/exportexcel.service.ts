import { Inject, Injectable } from '@nestjs/common';
import { Allocation } from 'src/typeorm/entities/allocation';
import { Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExportexcelService {
  constructor(
    @Inject('ALLOCATION_REPOSITORY')
    private allocation: Repository<Allocation>,
  ) {}

  async getAllAllocations(): Promise<Allocation[]> {
    return this.allocation.find({ relations: ['category', 'district','allocationdetail'] });
  }

  async exportAllocationsToExcel(data: Allocation[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Allocations');

    // Menambahkan header kolom
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nilai', key: 'nilai', width: 30 },
      { header: 'Lokasi', key: 'district', width: 30 },
      { header: 'Kategori', key: 'category', width: 30 },
      { header: 'Kota', key: 'kota', width: 20 },
      { header: 'Provinsi', key: 'provinsi', width: 20 },
      { header: 'Pusat', key: 'pusat', width: 20 },
    ];

    data.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        nilai: item.nilai,
        district: item.district.name,
        category: item.category.name,
        kota: item.allocationdetail.kota,
        provinsi: item.allocationdetail.provinsi,
        pusat: item.allocationdetail.pusat,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as Buffer;
  }
}
