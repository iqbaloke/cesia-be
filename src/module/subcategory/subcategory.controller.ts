import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubCategory, UpdateSubCategory } from 'src/dto/sub_category.dto';
import { Pagination } from 'src/utils/paginate';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subCategoryService: SubcategoryService) {}

  @Get('/with-relation')
  async withRelation(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('search') search?: string,
  ): Promise<{ subcategories: any[]; count: number }> {
    const pagination: Pagination = {
      limit: limit ? Number(limit) : 100,
      offset: offset ? Number(offset) : 0,
    };

    const data = this.subCategoryService.example(pagination, search);
    return data;
  }

  @Get()
  async index(
    @Query('paginate') paginate: Pagination = { offset: 0, limit: 100 },
  ): Promise<any> {
    const data = this.subCategoryService.allSub(paginate);
    return data;
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<any> {
    return this.subCategoryService.showSub(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async store(@Body() create: CreateSubCategory): Promise<any> {
    return this.subCategoryService.storeSub(create);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: number,
    @Body() update: UpdateSubCategory,
  ): Promise<any> {
    return this.subCategoryService.updateSub(id, update);
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<any> {
    return this.subCategoryService.destroySub(id);
  }
}
