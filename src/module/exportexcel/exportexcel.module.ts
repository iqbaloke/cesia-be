import { Module } from '@nestjs/common';
import { ExportexcelController } from './exportexcel.controller';
import { ExportexcelService } from './exportexcel.service';
import { DatabaseModule } from 'src/database/database.module';
import { AllocationProvider } from 'src/provider/allocation.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ExportexcelController],
  providers: [...AllocationProvider, ExportexcelService],
})
export class ExportexcelModule {}
