import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { IndikatorService } from './indikator.service';
import { penguji, tb_indikator } from '@prisma/client';
import { Kuesioner } from 'src/type/typeDto';
import { KuisionerService } from 'src/kuisioner/kuisioner.service';

@Controller('indikator')
export class IndikatorController {
  constructor(
    private readonly indikatorService: IndikatorService,
    private readonly kuisionerService: KuisionerService,
  ) {}

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
    const perintah = `berikan kuisioner domain ${formKuisioner.nama_domain} dengan aspek ${formKuisioner.nama_aspek}, untuk indikator ${formKuisioner.nama_indikator} pada Dinas Komunikasi dan Informasi Kota Kendari untuk domain COBIT 5 level ${formKuisioner.level} setiap indikator minimal teks pertanyaannya 5 pertanyaan. buatkan dalam bentuk json dengan format seperti dibawah ini outputnya hanya format json tanpa kalimat lain 

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
  opsi_jawaban: ['Ya', 'Tidak'];
  jawaban:string
}
`;
    // console.log(perintah);

    const hasil = await this.kuisionerService.gpt(perintah);

    return { status: 'success', data: JSON.parse(hasil) };
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
      id_penguji: string;
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
            formData.id_penguji,
          ),
      ),
    );
    const jawaban = `json_start ${formData.data} 
    json_end

    dari jawaban JSON diatas, berikan skor tujuan dalam bentuk persentase
    berikan keterangan tiap pertanyaan berapa skor jika ya dan berapa jika tidak
    cara perhitungannya 100 dibagi jumlah soal, maka itu bobot satu soalnya
    hasil jawabannya dalam bentuk JSON dengan format JSON,
    hasilnya hanya {skor:number}, tidak ada teks yang lain
    `;
    const skorJawaban = await this.kuisionerService.gpt(jawaban);
    // console.log(jawaban);
    await this.indikatorService.skor(
      formData.id_indikator,
      formData.id_penguji,
      formData.level,
      JSON.parse(skorJawaban).skor,
    );
    return {
      status: 'success',
      data: JSON.parse(skorJawaban),
    };
  }

  @Post('penguji')
  async penguji(@Body() formData: penguji) {
    const data = await this.indikatorService.penguji(formData);
    return {
      data: data,
      status: 'ok',
      message: 'success',
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
