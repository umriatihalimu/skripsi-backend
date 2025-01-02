// service untuk logicnya

import { Body, Injectable, Param } from '@nestjs/common';
import { tb_kuisioner } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KuisionerService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.tb_kuisioner.findMany({
      orderBy: {
        time_stamp: 'asc',
      },
    });
  }

  async create(@Body() formData: tb_kuisioner) {
    return await this.prismaService.tb_kuisioner.create({
      data: {
        kuisioner: formData.kuisioner,
      },
    });
  }

  async update(@Param('id') id: string, @Body() updateData: tb_kuisioner) {
    return await this.prismaService.tb_kuisioner.update({
      where: { id_kuisioner: Number(id) },
      data: { kuisioner: updateData.kuisioner },
    });
  }

  async delete(@Param('id') id: string) {
    return await this.prismaService.tb_kuisioner.delete({
      where: { id_kuisioner: Number(id) },
    });
  }
}
