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

  async all(year: number, districtId: number): Promise<any> {
    const results = await this.dashboard
      .createQueryBuilder('allocation')
      .leftJoinAndSelect('allocation.district', 'district')
      .select('district.name', 'district_name')
      .addSelect('SUM(allocation.nilai)', 'total_nilai')
      .where('YEAR(allocation.date) = :year', { year })
      .groupBy('district.name')
      .getRawMany()
      .then((results) =>
        results.map((result) => ({
          district_name: result.district_name,
          total_nilai: Number(result.total_nilai),
        })),
      );

    return results;
  }
}
