import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryProvider } from 'src/provider/category.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...CategoryProvider, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
