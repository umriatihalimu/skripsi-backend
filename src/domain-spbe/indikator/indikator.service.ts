import { Body, Injectable, Param } from '@nestjs/common';
import { penguji, tb_indikator } from '@prisma/client';
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
    console.log(formIndikator);

    return await this.prisma.tb_indikator.create({
      data: {
        indikator: formIndikator.indikator,
        nama_indikator: formIndikator.nama_indikator,
        id_aspek: formIndikator.id_aspek,
        id_domain: formIndikator.id_domain,
      },
    });
  }

  async jawaban(
    data: Pertanyaan,
    id_domain: string,
    id_aspek: string,
    id_indikator: string,
    level: string,
    id_penguji: string,
  ) {
    return await this.prisma.jawab_kuisioner.create({
      data: {
        jawaban: data.jawaban,
        soal: data.teks,
        id_domain: Number(id_domain),
        id_aspek: Number(id_aspek),
        id_indikator: Number(id_indikator),
        level: Number(level),
        id_penguji: Number(id_penguji),
      },
    });
  }

  async skor(
    id_indikator: string,
    id_penguji: string,
    level: string,
    skor: string,
  ) {
    return await this.prisma.skor.create({
      data: {
        skor: Number(skor),
        level: Number(level),
        id_indikator: Number(id_indikator),
        id_penguji: Number(id_penguji),
      },
    });
  }

  async penguji(formData: penguji) {
    return await this.prisma.penguji.create({
      data: {
        nama_penguji: formData.nama_penguji,
        jabatan: formData.jabatan,
        keterangan: formData.keterangan,
        tanggal_uji: formData.tanggal_uji,
      },
    });
  }

  async deleteIndikator(id: string) {
    try {
      await this.prisma.tb_kuisioner.deleteMany({
        where: { id_indikator: Number(id) },
      });
      await this.prisma.jawab_kuisioner.deleteMany({
        where: { id_indikator: Number(id) },
      });
      await this.prisma.skor.deleteMany({
        where: { id_indikator: Number(id) },
      });
      await this.prisma.tb_indikator.delete({
        where: { id_indikator: Number(id) },
      });
    } catch (error) {
      console.log('errorr:', error);
    }
    return 'xxx';
  }

  async indikatorByIdaspek(id: string) {
    return await this.prisma.tb_indikator.findMany({
      where: { id_aspek: Number(id) },
    });
  }
}
