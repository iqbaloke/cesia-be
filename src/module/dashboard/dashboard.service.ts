import { Inject, Injectable } from '@nestjs/common';
import { Allocation } from 'src/typeorm/entities/allocation';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('ALLOCATION_REPOSITORY')
    private dashboard: Repository<Allocation>,
  ) {}

  async dashboardGrafig(districtIds?: number[]): Promise<any> {
    const query = this.dashboard
      .createQueryBuilder('allocation')
      .leftJoinAndSelect('allocation.district', 'district')
      .leftJoinAndSelect('allocation.category', 'category');

    if (districtIds && districtIds.length > 0) {
      query.where('allocation.district_id IN (:...districtIds)', {
        districtIds,
      });
    }

    const results = await query.getMany();

    const groupedResults = results.reduce((acc, curr) => {
      const districtName = curr.district.name;
      if (!acc[districtName]) {
        acc[districtName] = [];
      }
      acc[districtName].push(curr);
      return acc;
    }, {});

    return groupedResults;
  }

  async all(districtId: number): Promise<any[]> {
    const results = await this.dashboard.find({
      where: { district_id: districtId },
      relations: ['district', 'category'],
    });

    return results.map((allocation) => ({
      kota: Number(allocation.kota),
      provinsi: Number(allocation.provinsi),
      pusat: Number(allocation.pusat),
      district_name: allocation.district.name,
      kategori: allocation.category.name,
    }));
  }
}
