import { Module } from '@nestjs/common';
import { AllocationController } from './allocation.controller';
import { AllocationService } from './allocation.service';
import { DatabaseModule } from 'src/database/database.module';
import { AllocationProvider } from 'src/provider/allocation.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AllocationController],
  providers: [...AllocationProvider, AllocationService],
})
export class AllocationModule {}
