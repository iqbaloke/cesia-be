import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private serviceDashboard: DashboardService) {}

  @Get('grouped-by-district')
  async index(@Query('district_id') districtIds?: string) {
    const ids = districtIds ? districtIds.split(',').map((id) => +id) : [];
    return await this.serviceDashboard.dashboardGrafig(ids);
  }

  @Get('by-district/:districtId')
  async findByDistrictId(@Param('districtId') districtId: number) {
    return await this.serviceDashboard.all(districtId);
  }
}
