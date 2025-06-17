// service untuk logicnya

import { Body, Injectable, Param } from '@nestjs/common';
import { tb_kuisioner } from '@prisma/client';
import OpenAI from 'openai';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KuisionerService {
  constructor(private readonly prismaService: PrismaService) {}

  async gpt(command: string): Promise<string> {
    const openai = new OpenAI({ apiKey: process.env.KEY_GPT }); //inisialisasi ai

    const completion = await openai.chat.completions.create({
      //fungsi kirim pertanyaan
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: command,
        },
      ],
    });

    return completion.choices[0].message.content //ambil jwbn hilangkan jsonnya
      .replaceAll('```', '')
      .replaceAll('json', '');
  }

  async findAll(id: number) {
    return await this.prismaService.tb_kuisioner.findMany({
      where: {
        id_indikator: id,
      },
      orderBy: {
        level: 'asc', // atau 'desc' untuk urutan menurun
      },
    });
  }

  async create(@Body() formData: tb_kuisioner) {
    return await this.prismaService.tb_kuisioner.create({
      data: {
        kuisioner: formData.kuisioner,
        id_indikator: Number(formData.id_indikator),
        level: Number(formData.level),
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
