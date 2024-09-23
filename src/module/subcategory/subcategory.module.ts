import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { SubCategoryProvider } from 'src/provider/sub_category.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...SubCategoryProvider, SubcategoryService],
  controllers: [SubcategoryController],
})
export class SubcategoryModule {}
