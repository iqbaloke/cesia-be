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
import { DistrictService } from './district.service';
import { CreateDistrict, UpdateDistrict } from 'src/dto/district.dto';
import { Pagination } from 'src/utils/paginate';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async index(
    @Query('paginate') paginate: Pagination = { offset: 0, limit: 20 },
  ): Promise<any> {
    const data = this.districtService.allDistrict(paginate);
    return data;
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<any> {
    return await this.districtService.singleDistrict(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async store(@Body() create: CreateDistrict): Promise<any> {
    return await this.districtService.storeDistrict(create);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: number,
    @Body() updateDistrict: UpdateDistrict,
  ): Promise<any> {
    return await this.districtService.updateDIstrict(id, updateDistrict);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.districtService.deleteDistrict(id);
  }
}
