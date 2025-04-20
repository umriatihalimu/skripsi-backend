// controller hanya menerima req dan panggil service

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { tb_kuisioner } from '@prisma/client';
import { KuisionerService } from './kuisioner.service';

@Controller('kuisioner') // Prefix untuk route
export class KuisionerController {
  constructor(private readonly kuisionerService: KuisionerService) {}

  @Get()
  async findAll() {
    const find = await this.kuisionerService.findAll();
    return {
      status: 'ok',
      message: 'success',
      data: find,
    };
  }

  @Post()
  async create(@Body() formData: tb_kuisioner) {
    await this.kuisionerService.create(formData);
    return {
      status: 'ok',
      message: 'success',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: tb_kuisioner) {
    await this.kuisionerService.update(id, updateData);
    return {
      status: 'ok',
      message: 'success',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.kuisionerService.delete(id);
      return {
        status: 'ok',
        message: 'success',
      };
    } catch (error) {
      return {
        status: `error ${error} `,
        message: 'failed',
      };
    }
  }
}
