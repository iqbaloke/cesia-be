import { District } from 'src/typeorm/entities/district_entity';
import { DataSource } from 'typeorm';

export const DistrictProvider = [
  {
    provide: 'DISTRICT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(District),
    inject: ['DATA_SOURCE'],
  },
];
