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
import { CategoryService } from './category.service';
import { UpdateCategory } from 'src/dto/category.dto';
import { Category } from 'src/typeorm/entities/category_entity';
import { Pagination } from 'src/utils/paginate';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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

    const data = this.categoryService.example(pagination, search);
    return data;
  }

  @Get()
  async index(
    @Query('paginate') paginate: Pagination = { offset: 0, limit: 100 },
  ) {
    const data = this.categoryService.allCategory(paginate);
    return data;
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<any> {
    return this.categoryService.showCategory(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async store(@Body() create: Partial<Category>): Promise<Category> {
    return this.categoryService.storeCategory(create);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: number,
    @Body() update: UpdateCategory,
  ): Promise<any> {
    return this.categoryService.updateCategory(id, update);
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<any> {
    return this.categoryService.destroyCategory(id);
  }
}
