import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategory, UpdateSubCategory } from 'src/dto/sub_category.dto';
import { SubCategory } from 'src/typeorm/entities/subcategory_entity';
import { Pagination } from 'src/utils/paginate';
import response_data from 'src/utils/response_data';
import { Repository } from 'typeorm';

@Injectable()
export class SubcategoryService {
  constructor(
    @Inject('SUB_CATEGORY_REPOSITORY')
    private readonly repository: Repository<SubCategory>,
  ) {}

  // with-relation
  async example(
    pagination: Pagination,
    search?: string,
  ): Promise<{ subcategories: SubCategory[]; count: number }> {
    const { limit, offset } = pagination;

    // default get data
    const queryBuilder = this.repository
      .createQueryBuilder('subcategory')
      .leftJoinAndSelect('subcategory.category', 'category')
      .take(limit)
      .skip(offset);

    // search data
    if (search) {
      queryBuilder.andWhere('LOWER(subcategory.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const [subcategories, count] = await queryBuilder.getManyAndCount();

    const responseData = {
      data: subcategories,
      count,
    };

    return response_data.success(responseData);
  }

  async allSub(paginate: Pagination): Promise<any> {
    const response = await this.repository.findAndCount({
      skip: paginate.offset,
      take: paginate.limit,
    });

    const dataresponse = {
      data: response[0],
      count: response[1],
    };

    return response_data.success(dataresponse);
  }

  async showSub(id: number): Promise<any> {
    
    const subcategory = await this.repository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategory;
  }

  async storeSub(createSub: CreateSubCategory): Promise<any> {
    const data = this.repository.create({
      ...createSub,
      createdAt: new Date(),
    });

    return this.repository.save(data);
  }

  async updateSub(id: number, updateSub: UpdateSubCategory): Promise<any> {
    const subcategory = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!subcategory) {
      throw new NotFoundException(
        response_data.error(400, 'Data tidak ditemukan'),
      );
    }
    Object.assign(subcategory, updateSub);
    this.repository.save(subcategory);

    const dataresponse = {
      message: 'Data Berhasil Diubah',
      status: 200,
    };

    return response_data.success(dataresponse);
  }
  async destroySub(id: number): Promise<any> {
    const subcategory = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!subcategory) {
      throw new NotFoundException(
        response_data.error(400, 'Data tidak ditemukan'),
      );
    }

    await this.repository.remove(subcategory);

    const dataresponse = {
      message: 'Data Berhasil Dihapus',
      status: 200,
    };

    return response_data.success(dataresponse);
  }
}
