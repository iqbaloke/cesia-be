
import { DetailAllocation } from 'src/typeorm/entities/detail_allocation';
import { DataSource } from 'typeorm';

export const DetaillAllocationProvider = [
  {
    provide: 'DETAIL_ALLOCATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DetailAllocation),
    inject: ['DATA_SOURCE'],
  },
];
