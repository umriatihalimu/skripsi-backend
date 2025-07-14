import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PertanyaanService } from './pertanyaan.service';
import { jawab_kuisioner, penguji, tb_kuisioner } from '@prisma/client';
import { jawab_pertanyaan, sc, tb_kuisionerBaru } from 'src/type/typeDto';
import { PrismaService } from 'src/prisma.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'
@Controller('pertanyaan')
export class PertanyaanController {
  constructor(
    private readonly pertanyaanService: PertanyaanService,
    private readonly prisma: PrismaService,
  ) { }

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
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './upload', // <-- satu folder
      filename: (req, file, callback) => {
        const mime = {
          "application/pdf": "pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
          "application/msword": "doc",
        }

        const id = uuidv4()
        const name = file.fieldname + "_" + id + "." + mime[file.mimetype]
        callback(null, name)
      },
    }),
  }))
  async prosesJawaban(
    @Body()
    jawabx: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {

    const jawab: tb_kuisionerBaru[] = JSON.parse(jawabx.data)
    var jumlahYa = 0;
    var jumlahTidak = 0;
    var jumlahSeluruhnya = jawab.length;
    var dataJawaban: jawab_pertanyaan[] = [];
    var level: number = 0;
    var id_indikator = 0;


    jawab.forEach((data, i) => {
      if (i == 0) {
        level = data.level;
        id_indikator = data.id_indikator;
      }
      if (data.jawaban === 'Ya') jumlahYa++;
      else if (data.jawaban === 'Tidak') jumlahTidak++;
      var filename = "";
      files.filter((a) => {
        const cfile = a.filename.split("_")[2]

        if (Number(cfile) == data.id_kuisioner) {
          filename = a.filename
        }

      })

      dataJawaban.push({
        level: data.level,
        soal: data.kuisioner,
        jawaban: data.jawaban,
        id_domain: Number(jawabx.id_domain),
        id_aspek: Number(jawabx.id_aspek),
        id_indikator: Number(data.id_indikator),
        id_penguji: Number(jawabx.id_penguji),
        id_kuisioner: data.id_kuisioner,
        nama_file: filename

      });
    }); // opsi lain tidak dihitung
    var hasil = (jumlahYa / jumlahSeluruhnya) * 100;

    await this.prisma.jawab_kuisioner.createMany({
      data: dataJawaban,
    });
    await this.prisma.skor.create({
      data: {
        skor: hasil,
        id_penguji: Number(jawabx.id_penguji),
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
