import { Allocation } from 'src/typeorm/entities/allocation';
import { Category } from 'src/typeorm/entities/category_entity';
import { DetailAllocation } from 'src/typeorm/entities/detail_allocation';
import { District } from 'src/typeorm/entities/district_entity';
import { SubCategory } from 'src/typeorm/entities/subcategory_entity';
import { User } from 'src/typeorm/entities/user_entity';
import { DataSource } from 'typeorm';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [
          User,
          Category,
          SubCategory,
          District,
          Allocation,
          DetailAllocation,
        ],
        synchronize: true,
        extra: {
          trustServerCertificate: true,
        },
      });
      try {
        if (!dataSource.isInitialized) {
          console.log('awaiting DB');
          await dataSource.initialize();
        }
      } catch (error) {
        console.error(error?.message);
      }
      console.log('DB Connected');
      return dataSource;
    },
  },
];
