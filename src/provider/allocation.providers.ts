import { Allocation } from 'src/typeorm/entities/allocation';
import { User } from 'src/typeorm/entities/user_entity';
import { DataSource } from 'typeorm';

export const AllocationProvider = [
  {
    provide: 'ALLOCATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Allocation),
    inject: ['DATA_SOURCE'],
  },
];
