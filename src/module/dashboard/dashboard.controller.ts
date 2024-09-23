import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private serviceDashboard: DashboardService) {}

  //   @Get(':district_id')
  //   async index(@Param('district_id') district_id: number) {
  //     return await this.serviceDashboard.dashboardGrafig(district_id);
  //   }
  
  @Get('grouped-by-district')
  async index(@Query('district_id') districtIds?: string) {
    const ids = districtIds ? districtIds.split(',').map((id) => +id) : [];
    return await this.serviceDashboard.dashboardGrafig(ids);
  }
}
