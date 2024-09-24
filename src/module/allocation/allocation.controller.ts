import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Pagination } from 'src/utils/paginate';
import { AllocationService } from './allocation.service';
import { Allocation } from 'src/typeorm/entities/allocation';
import { UpdateAllocation } from 'src/dto/allocation.dto';

interface UserInterface {
  id: number;
  role: string;
}

interface CustomRequest extends Request {
  user?: UserInterface;
}

@Controller('allocation')
export class AllocationController {
  constructor(private readonly allocationService: AllocationService) {}

  @Get('/with-relation')
  async withRelation(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('search') search?: string,
  ): Promise<{ allocation: any[]; count: number }> {
    const pagination: Pagination = {
      limit: limit ? Number(limit) : 100,
      offset: offset ? Number(offset) : 0,
    };

    const data = this.allocationService.example(pagination, search);
    return data;
  }

  @Get()
  async index(
    @Query('paginate') paginate: Pagination = { offset: 0, limit: 100 },
  ) {
    const data = this.allocationService.allAllocation(paginate);
    return data;
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<any> {
    return this.allocationService.showAllocation(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async store(
    @Req() req: CustomRequest,
    @Body() create: Partial<Allocation>,
  ): Promise<any> {
    const userId = req.user?.id;
    return this.allocationService.storeAllocation( create, Number(userId),);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: number,
    @Body() update: UpdateAllocation,
    @Req() req: CustomRequest,
  ): Promise<any> {
    const userId = req.user?.id;
    return this.allocationService.updateAllocation(id, update, userId);
  }

  @Delete(':id')
  async destroy(@Param('id') id: number): Promise<any> {
    return this.allocationService.destroyAllocation(id);
  }
}
