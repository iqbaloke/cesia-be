import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAllocation, UpdateAllocation } from 'src/dto/allocation.dto';
import { Allocation } from 'src/typeorm/entities/allocation';
import { Pagination } from 'src/utils/paginate';
import response_data from 'src/utils/response_data';
import { Repository } from 'typeorm';

@Injectable()
export class AllocationService {
  constructor(
    @Inject('ALLOCATION_REPOSITORY')
    private readonly respository: Repository<Allocation>,
  ) {}

  async example(
    paginate: Pagination,
    search?: string,
  ): Promise<{ allocation: Allocation[]; count: number }> {
    const { limit, offset } = paginate;
    const queryBuilder = this.respository
      .createQueryBuilder('allocation')
      .leftJoinAndSelect('allocation.category', 'category')
      .leftJoinAndSelect('allocation.district', 'district')
      .leftJoinAndSelect('allocation.user', 'user')
      .skip(offset)
      .take(limit);

    if (search) {
      queryBuilder.andWhere(
        'LOWER(category.name) LIKE LOWER(:search) OR LOWER(district.name) LIKE LOWER(:search) OR LOWER(user.name) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const [allocation, count] = await queryBuilder.getManyAndCount();

    const responseData = {
      data: allocation,
      count,
    };

    return response_data.success(responseData);
  }

  async allAllocation(paginate: Pagination): Promise<any> {
    const response = await this.respository.findAndCount({
      skip: paginate.offset,
      take: paginate.limit,
    });

    const data = {
      data: response[0],
      count: response[1],
    };

    return response_data.success(data);
  }

  async showAllocation(id: number): Promise<any> {
    const allocation = await this.respository.findOne({ where: { id }, relations:['category','district','user'] });
    if (!allocation) {
      throw new NotFoundException(
        response_data.error(400, 'Allocation tidak ditemukan'),
      );
    }

    return allocation;
  }
  async storeAllocation(createAllocation: Partial<Allocation>): Promise<any> {
    const data = this.respository.create({
      ...createAllocation,
      createdAt: new Date(),
    });

    return await this.respository.save(data);
  }
  async updateAllocation(
    id: number,
    updateAllocation: UpdateAllocation,
  ): Promise<any> {
    const allocation = await this.respository.findOne({ where: { id } });
    if (!allocation) {
      throw new NotFoundException(
        response_data.error(400, 'Allocation tidak ditemukan'),
      );
    }
    Object.assign(allocation, updateAllocation);
    return await this.respository.save(allocation);
  }
  async destroyAllocation(id: number): Promise<any> {
    const allocation = await this.respository.findOne({ where: { id } });
    if (!allocation) {
      throw new NotFoundException(
        response_data.error(400, 'Allocation tidak ditemukan'),
      );
    }

    await this.respository.remove(allocation);

    const dataresponse = {
      message: 'Data Berhasil Dihapus',
      status: 200,
    };

    return response_data.success(dataresponse);
  }
}
