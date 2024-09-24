import { Inject, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateAllocation, UpdateAllocation } from 'src/dto/allocation.dto';
import { Allocation } from 'src/typeorm/entities/allocation';
import { Category } from 'src/typeorm/entities/category_entity';
import { DetailAllocation } from 'src/typeorm/entities/detail_allocation';
import { Pagination } from 'src/utils/paginate';
import response_data from 'src/utils/response_data';
import { Repository } from 'typeorm';
import { In } from 'typeorm';

@Injectable()
export class AllocationService {
  constructor(
    @Inject('ALLOCATION_REPOSITORY')
    private readonly respository: Repository<Allocation>,
    @Inject('CATEGORY_REPOSITORY')
    private readonly category: Repository<Category>,

    @Inject('DETAIL_ALLOCATION_REPOSITORY')
    private readonly detailAllocation: Repository<DetailAllocation>,
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
      .leftJoinAndSelect('allocation.allocationdetail', 'allocationdetail')
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
    const allocation = await this.respository.findOne({
      where: { id },
      relations: ['category', 'district', 'user', 'allocationdetail'],
    });
    if (!allocation) {
      throw new NotFoundException(
        response_data.error(400, 'Allocation tidak ditemukan'),
      );
    }

    return allocation;
  }

  async storeAllocation(
    createAllocation: Partial<Allocation>,
    id: number,
  ): Promise<any> {
    // search category
    const categories = await this.category.findOne({
      where: { id: createAllocation.category_id },
    });
    // end search category

    // create allocation
    const data = this.respository.create({
      ...createAllocation,
      createdAt: new Date(),
    });
    const dataAllocation = await this.respository.save(data);
    // end create allocation

    // penjumlahan
    const datacategories = {
      nilai: dataAllocation.nilai,
      date: createAllocation.date,
      kota: createAllocation.nilai * (Number(categories.kota) / 100),
      provinsi: createAllocation.nilai * (Number(categories.provinsi) / 100),
      pusat: createAllocation.nilai * (Number(categories.pusat) / 100),
      category_id: createAllocation.category_id,
      allocation_id: Number(dataAllocation.id),
      district_id: createAllocation.district_id,
      user_id: id,
      potongan_kota: categories.kota,
      potongan_provinsi: categories.provinsi,
      potongan_pusat: categories.pusat,
    };
    // end penjumlahan

    // create detailallocation
    const dataDetailAllocation = this.detailAllocation.create({
      ...datacategories,
      createdAt: new Date(),
    });

    this.detailAllocation.save(dataDetailAllocation);
    // end create detailallocation

    return dataAllocation;
  }

  async updateAllocation(
    id: number,
    updateAllocation: UpdateAllocation,
    userId: number,
  ): Promise<any> {
    const allocation = await this.respository.findOne({ where: { id } });
    if (!allocation) {
      throw new NotFoundException(
        response_data.error(400, 'Allocation tidak ditemukan'),
      );
    }

    // search data by category_id
    const categories = await this.category.findOne({
      where: { id: Number(updateAllocation.category_id) },
    });
    // end search data category_id

    // destroy relation allocationdetail
    const detailAllocationData = await this.detailAllocation.findOne({
      where: { allocation_id: allocation.id },
    });
    await this.detailAllocation.remove(detailAllocationData);
    // end destroy relation allocationdetail

    // updated allocation

    Object.assign(allocation, updateAllocation);

    const dataUPdateAllocationRes = this.respository.create({
      ...allocation,
      updatedAt: new Date(),
      user_id: userId,
    });

    const dataAllocationUpdate = await this.respository.save(
      dataUPdateAllocationRes,
    );
    // end updated allocation

    // penjumlahan
    const datacategories = {
      nilai: dataAllocationUpdate.nilai,
      date: dataAllocationUpdate.date,
      kota: dataAllocationUpdate.nilai * (Number(categories.kota) / 100),
      provinsi:
        dataAllocationUpdate.nilai * (Number(categories.provinsi) / 100),
      pusat: dataAllocationUpdate.nilai * (Number(categories.pusat) / 100),
      category_id: dataAllocationUpdate.category_id,
      allocation_id: Number(dataAllocationUpdate.id),
      district_id: dataAllocationUpdate.district_id,
      user_id: userId,
      potongan_kota: categories.kota,
      potongan_provinsi: categories.provinsi,
      potongan_pusat: categories.pusat,
    };
    // end penjumlahan

    // create detailallocation
    const createAllocationDetail = this.detailAllocation.create({
      ...datacategories,
      createdAt: new Date(),
    });

    this.detailAllocation.save(createAllocationDetail);
    // end create detailallocation

    return dataAllocationUpdate;
  }

  async destroyAllocation(id: number): Promise<any> {
    const allocation = await this.respository.findOne({ where: { id } });
    if (!allocation) {
      throw new NotFoundException(
        response_data.error(400, 'Allocation tidak ditemukan'),
      );
    }

    // destroy relation allocationdetail
    const detailAllocationData = await this.detailAllocation.findOne({
      where: { allocation_id: allocation.id },
    });
    await this.detailAllocation.remove(detailAllocationData);
    // end destroy relation allocationdetail

    await this.respository.remove(allocation);

    const dataresponse = {
      message: 'Data Berhasil Dihapus',
      status: 200,
    };

    return response_data.success(dataresponse);
  }
}
