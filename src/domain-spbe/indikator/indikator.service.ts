import { Body, Injectable, Param } from '@nestjs/common';
import { tb_indikator } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IndikatorService {
  constructor(private readonly prisma: PrismaService) {}
  async getIndikator() {
    return await this.prisma.tb_indikator.findMany({
      include: {
        tb_aspek: {
          include: {
            tb_domain: true,
          },
        },
      },
    });
  }

  async createIndikator(@Body() formIndikator: tb_indikator) {
    return await this.prisma.tb_indikator.create({
      data: {
        indikator: formIndikator.indikator,
        nama_indikator: formIndikator.nama_indikator,
      },
    });
  }

  async deleteIndikator(id: string) {
    return await this.prisma.tb_indikator.delete({
      where: { id_indikator: Number(id) },
    });
  }

  async indikatorByIdaspek(id: string) {
    return await this.prisma.tb_indikator.findMany({
      where: { id_aspek: Number(id) },
    });
  }
}
