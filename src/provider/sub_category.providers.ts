import { SubCategory } from 'src/typeorm/entities/subcategory_entity';
import { DataSource } from 'typeorm';

export const SubCategoryProvider = [
  {
    provide: 'SUB_CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubCategory),
    inject: ['DATA_SOURCE'],
  },
];
