import { DatabaseModule } from './../../database/database.module';
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AllocationProvider } from 'src/provider/allocation.providers';

@Module({
  controllers: [DashboardController],
  providers: [...AllocationProvider, DashboardService],
  imports: [DatabaseModule],
})
export class DashboardModule {}
