import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IndikatorService } from './indikator.service';
import { tb_indikator } from '@prisma/client';

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
    },
  ) {
    const perintah = `berikan kuisioner
${formKuisioner.nama_domain}
${formKuisioner.nama_aspek}
 dengan ${formKuisioner.nama_indikator}
buatkan dalam bentuk json dengan format seperti dibawah ini 
outputnya hanya format json tanpa kalimat lain minimal 10 pernyataan

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
}
`;
    console.log(perintah);

    return { status: 'success' };
  }

  @Post('jawab')
  async jawab(@Body() formData: { data: string }) {
    const jawaban = `${formData.data}
    
    dari data json diatas hitung dengan menggunakan COBIT 5 tampilkan output dan cara perhitungannya saja. Tidak perlu tampilkan jsonnya
    `;
    console.log(jawaban);
    return {
      status: 'success',
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
