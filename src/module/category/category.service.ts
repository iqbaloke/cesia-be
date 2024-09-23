import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategory, UpdateCategory } from 'src/dto/category.dto';
import { Category } from 'src/typeorm/entities/category_entity';
import { Pagination } from 'src/utils/paginate';
import response_data from 'src/utils/response_data';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly repo: Repository<Category>,
  ) {}

  async example(paginate: Pagination, search?: string): Promise<any> {
    const { limit, offset } = paginate;

    const queryBuilder = this.repo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategory', 'subcategory') // Mengambil subkategori
      .skip(offset)
      .take(limit);

    // Tambahkan kondisi pencarian jika ada
    if (search) {
      queryBuilder.andWhere('LOWER(category.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const [categories, count] = await queryBuilder.getManyAndCount();

    const responseData = {
      data: categories,
      count,
    };

    return response_data.success(responseData);
  }

  async allCategory(paginate: Pagination): Promise<any> {
    const response = await this.repo.findAndCount({
      skip: paginate.offset,
      take: paginate.limit,
    });

    const data = {
      data: response[0],
      count: response[1],
    };

    return response_data.success(data);
  }

  async showCategory(id: number): Promise<any> {
    const category = await this.repo.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(
        response_data.error(400, 'Category tidak ditemukan'),
      );
    }

    return category;
  }

  async storeCategory(createCategory: Partial<Category>): Promise<Category> {
    const data = this.repo.create({
      ...createCategory,
      createdAt: new Date(),
    });
    return await this.repo.save(data);
  }

  async updateCategory(
    id: number,
    updatecategory: UpdateCategory,
  ): Promise<any> {
    const category = await this.repo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(
        response_data.error(400, 'Categori tidak ditemukan'),
      );
    }

    Object.assign(category, updatecategory);

    return await this.repo.save(category);
  }

  async destroyCategory(id: number): Promise<any> {
    const category = await this.repo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(
        response_data.error(400, 'Categori tidak ditemukan'),
      );
    }
    await this.repo.remove(category);

    const dataresponse = {
      message: 'Data Berhasil Dihapus',
      status: 200,
    };

    return response_data.success(dataresponse);
  }
}
