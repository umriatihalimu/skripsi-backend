import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PengujiService {
  constructor(private readonly prisma: PrismaService) {}

  async getPenguji() {
    return await this.prisma.penguji.findMany({
      orderBy: {
        time_stamp: 'desc',
      },
    });
  }

  async getJawabKuisioner(id_penguji: string) {
    return this.prisma.jawab_kuisioner.findMany({
      orderBy: {
        level: 'asc',
      },
      where: {
        id_penguji: Number(id_penguji),
      },
    });
  }

  async getSkor(id_penguji: string) {
    const penguji = await this.prisma.penguji.findFirst({
      where: {
        id_penguji: Number(id_penguji),
      },
    });
    const skor = await this.prisma.skor.findMany({
      orderBy: {
        level: 'asc',
      },
      where: {
        id_penguji: Number(id_penguji),
      },
      include: {
        tb_indikator: {
          include: {
            jawab_kuisioner: {
              orderBy: {
                level: 'asc',
              },
            },
          },
        },
      },
    });
    return { penguji: penguji, skor: skor };
  }
}
