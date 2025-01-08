import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IndikatorService } from './indikator.service';
import { tb_indikator } from '@prisma/client';
import { json } from 'stream/consumers';
import { Kuesioner } from 'src/type/typeDto';

@Controller('indikator')
export class IndikatorController {
  constructor(private indikatorService: IndikatorService) {}

  @Get()
  async getDomain() {
    return await this.indikatorService.getIndikator();
  }

  @Post()
  async createIndikator(@Body() formIndikator: tb_indikator) {
    try {
      const data = await this.indikatorService.createIndikator(formIndikator);
      return {
        status: 'ok',
        message: 'success',
        data: data,
      };
    } catch (error) {
      return {
        status: `error ${error}`,
        message: 'failed',
      };
    }
  }

  @Post('get-kuisioner')
  async createKuisioner(
    @Body()
    formKuisioner: {
      nama_aspek: string;
      nama_domain: string;
      nama_indikator: string;
      level: string;
    },
  ) {
    const perintah = `berikan kuisioner
${formKuisioner.nama_domain}
${formKuisioner.nama_aspek}
 dengan ${formKuisioner.nama_indikator} pada Dinas Komunikasi dan Informasi Kota Kendari untuk domain COBIT 5 APO12 level ${formKuisioner.level}
buatkan dalam bentuk json dengan format seperti dibawah ini 
outputnya hanya format json tanpa kalimat lain 

interface Kuesioner {
  judul: string;
  deskripsi: string;
  indikator: Indikator[];
  tingkat_kematangan: Record<string, string>;
}

interface Indikator {
  id: string;
  nama: string;
  pertanyaan: Pertanyaan[];
}

interface Pertanyaan {
  id: string;
  teks: string;
  opsi_jawaban: string[];
  jawaban:string
}
`;
    console.log(perintah);

    return { status: 'success' };
  }

  @Post('jawab')
  async jawab(
    @Body()
    formData: {
      data: string;
      level: string;
      id_domain: string;
      id_aspek: string;
      id_indikator: string;
    },
  ) {
    const jawabanJson: Kuesioner = JSON.parse(formData.data);
    jawabanJson.indikator.forEach((value, index) =>
      value.pertanyaan.forEach(
        async (pertanyaan, i) =>
          await this.indikatorService.jawaban(
            pertanyaan,
            formData.id_domain,
            formData.id_aspek,
            formData.id_indikator,
            formData.level,
          ),
      ),
    );
    const jawaban = `${formData.data}
    dari jawaban diatas berikan skor tujuan dalam bentuk persentase dengan format JSON
    {skor:string}
    berikan keterangan tiap pertanyaan berapa skor jika ya dan berapa jika tidak

    cara perhitungannya 100 dibagi jumlah soal, maka itu bobot 1 soalnya


    `;
    console.log(jawaban);
    return {
      status: 'success',
      skor: 85,
    };
  }

  @Delete(':id')
  async deleteIndikator(@Param('id') id: string) {
    try {
      await this.indikatorService.deleteIndikator(id);
      return {
        status: 'ok',
        message: 'success deleted',
      };
    } catch (error) {
      return {
        status: `error ${error}`,
        message: 'failed',
      };
    }
  }

  @Get(':id')
  async indikatorByIdaspek(@Param('id') id: string) {
    return await this.indikatorService.indikatorByIdaspek(id);
  }
}
