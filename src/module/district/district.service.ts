import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrict, UpdateDistrict } from 'src/dto/district.dto';
import { District } from 'src/typeorm/entities/district_entity';
import { Pagination } from 'src/utils/paginate';
import response_data from 'src/utils/response_data';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictService {
  constructor(
    @Inject('DISTRICT_REPOSITORY')
    private readonly repository: Repository<District>,
  ) {}

  async allDistrict(paginate: Pagination): Promise<any> {
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

  async singleDistrict(id: number): Promise<any> {
    const district = await this.repository.findOne({ where: { id } });
    if (!district) {
      throw new NotFoundException(
        response_data.error(400, 'District tidak ditemukan'),
      );
    }

    return district;
  }

  async storeDistrict(createDistrict: CreateDistrict): Promise<any> {
    const district = this.repository.create({
      ...createDistrict,
      createdAt: new Date(),
    });

    return this.repository.save(district);
  }

  async updateDIstrict(
    id: number,
    updateDistrict: UpdateDistrict,
  ): Promise<any> {
    const district = await this.repository.findOne({ where: { id } });
    if (!district) {
      throw new NotFoundException(
        response_data.error(400, 'District tidak ditemukan'),
      );
    }

    Object.assign(district, updateDistrict);

    return await this.repository.save(district);
  }

  async deleteDistrict(id: number): Promise<any> {
    const district = await this.repository.findOne({ where: { id } });
    if (!district) {
      throw new NotFoundException(
        response_data.error(400, 'District tidak ditemukan'),
      );
    }

    this.repository.remove(district);

    const dataresponse = {
      message: 'Data Berhasil Dihapus',
      status: 200,
    };
    return response_data.success(dataresponse);
  }
}
