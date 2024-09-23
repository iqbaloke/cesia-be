import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { DistrictProvider } from 'src/provider/district.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DistrictController],
  providers: [...DistrictProvider, DistrictService],
})
export class DistrictModule {}
