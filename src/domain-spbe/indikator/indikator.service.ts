import { Body, Injectable, Param } from '@nestjs/common';
import { tb_indikator } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Pertanyaan } from 'src/type/typeDto';

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

  async jawaban(
    data: Pertanyaan,
    id_domain: string,
    id_aspek: string,
    id_indikator: string,
    level: string,
  ) {
    return await this.prisma.jawab_kuisioner.create({
      data: {
        jawaban: data.jawaban,
        soal: data.teks,
        id_domain: Number(id_domain),
        id_aspek: Number(id_aspek),
        id_indikator: Number(id_indikator),
        level: Number(level),
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
