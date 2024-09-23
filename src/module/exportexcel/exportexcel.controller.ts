import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportexcelService } from './exportexcel.service';
import { Allocation } from 'src/typeorm/entities/allocation';

@Controller('exportexcel')
export class ExportexcelController {
  constructor(private readonly expo: ExportexcelService) {}

  @Get('download')
  async downloadAllocations(@Res() res: Response) {
    const allocations: Allocation[] =
      await this.expo.getAllAllocations();

    const buffer =
      await this.expo.exportAllocationsToExcel(allocations);

    // Mengatur header untuk mengunduh file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=allocations.xlsx',
    );

    // Mengirim buffer sebagai respon
    res.end(buffer);
  }
}
