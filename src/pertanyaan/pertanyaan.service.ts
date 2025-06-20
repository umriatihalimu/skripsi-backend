import { Body, Injectable } from '@nestjs/common';
import { penguji, tb_kuisioner } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PertanyaanService {
  constructor(private readonly prisma: PrismaService) {}

  async getPertanyaan(level: number, id_indikator: number) {
    const data = await this.prisma.tb_kuisioner.findMany({
      where: {
        level: level,
        id_indikator: id_indikator,
      },
    });
    // Tambahkan key 'jawaban' ke setiap item
    const dataWithJawaban = data.map((item) => ({
      ...item,
      jawaban: '', // atau null, atau nilai default lainnya
    }));
    return dataWithJawaban;
  }

  async createPenguji(formDataPenguji: penguji) {
    return await this.prisma.penguji.create({
      data: {
        nama_penguji: formDataPenguji.nama_penguji,
        jabatan: formDataPenguji.jabatan,
        keterangan: formDataPenguji.keterangan,
        tanggal_uji: formDataPenguji.tanggal_uji,
      },
    });
  }
}
