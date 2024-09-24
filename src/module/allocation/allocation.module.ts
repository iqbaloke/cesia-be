import { Module } from '@nestjs/common';
import { AllocationController } from './allocation.controller';
import { AllocationService } from './allocation.service';
import { DatabaseModule } from 'src/database/database.module';
import { AllocationProvider } from 'src/provider/allocation.providers';
import { CategoryProvider } from 'src/provider/category.providers';
import { DetaillAllocationProvider } from 'src/provider/detail_allocation.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AllocationController],
  providers: [
    ...DetaillAllocationProvider,
    ...CategoryProvider,
    ...AllocationProvider,
    AllocationService,
  ],
})
export class AllocationModule {}
