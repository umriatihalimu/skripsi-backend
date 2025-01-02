import { Injectable } from '@nestjs/common';
import { tb_aspek } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AspekService {
  constructor(private readonly prisma: PrismaService) {}
  async getAspek() {
    return await this.prisma.tb_aspek.findMany({
      orderBy: {
        time_stamp: 'asc',
      },
      include: {
        tb_domain: true,
      },
    });
  }

  async createAspek(formAspek: tb_aspek) {
    return await this.prisma.tb_aspek.create({
      data: {
        id_domain: Number(formAspek.id_domain),
        aspek: formAspek.aspek,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.tb_aspek.delete({
      where: { id_aspek: Number(id) },
    });
  }

  async getAspekBydomain(id: string) {
    return await this.prisma.tb_aspek.findMany({
      where: { id_domain: Number(id) },
    });
  }
}
