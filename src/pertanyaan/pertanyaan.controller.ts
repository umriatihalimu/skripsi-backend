import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PertanyaanService } from './pertanyaan.service';
import { jawab_kuisioner, penguji, tb_kuisioner } from '@prisma/client';
import { jawab_pertanyaan, tb_kuisionerBaru } from 'src/type/typeDto';
import { PrismaService } from 'src/prisma.service';

@Controller('pertanyaan')
export class PertanyaanController {
  constructor(
    private readonly pertanyaanService: PertanyaanService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async getPertanyaan(
    @Query('id_indikator') id_indikator: string,
    @Query('level') level: string,
  ) {
    const data = await this.pertanyaanService.getPertanyaan(
      Number(level),
      Number(id_indikator),
    );
    return {
      data: data,
      status: 'ok',
      message: 'success',
    };
  }

  @Post()
  async prosesJawaban(
    @Body()
    jawab: {
      data: tb_kuisionerBaru[];
      id_penguji: string;
      id_domain: string;
      id_aspek: string;
    },
  ) {
    var jumlahYa = 0;
    var jumlahTidak = 0;
    var jumlahSeluruhnya = jawab.data.length;
    var dataJawaban: jawab_pertanyaan[] = [];
    var level: number = 0;
    var id_indikator = 0;
    jawab.data.forEach((data, i) => {
      if (i == 0) {
        level = data.level;
        id_indikator = data.id_indikator;
      }
      if (data.jawaban === 'Ya') jumlahYa++;
      else if (data.jawaban === 'Tidak') jumlahTidak++;
      dataJawaban.push({
        level: data.level,
        soal: data.kuisioner,
        jawaban: data.jawaban,
        id_domain: Number(jawab.id_domain),
        id_aspek: Number(jawab.id_aspek),
        id_indikator: Number(data.id_indikator),
        id_penguji: Number(jawab.id_penguji),
      });
    }); // opsi lain tidak dihitung
    var hasil = (jumlahYa / jumlahSeluruhnya) * 100;

    await this.prisma.jawab_kuisioner.createMany({
      data: dataJawaban,
    });
    await this.prisma.skor.create({
      data: {
        skor: hasil,
        id_penguji: Number(jawab.id_penguji),
        id_indikator: id_indikator,
        level: level,
      },
    });
    return {
      status: 'ok',
      message: 'success',
      hasil: hasil,
    };
  }

  @Post('simpan-data-penguji')
  async simpanDataPenguji(@Body() dataPenguji: penguji) {
    const data = await this.pertanyaanService.createPenguji(dataPenguji);
    return {
      status: 'ok',
      message: 'success',
      data: data,
    };
  }
}
