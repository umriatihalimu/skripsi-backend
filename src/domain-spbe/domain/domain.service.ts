import { Body, Injectable } from '@nestjs/common';
import { tb_domain } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DomainService {
  constructor(private readonly prisma: PrismaService) {}

  async getDomain() {
    return await this.prisma.tb_domain.findMany({
      orderBy: {
        time_stamp: 'asc',
      },
    });
  }

  async createDomain(@Body() formDomain: tb_domain) {
    return await this.prisma.tb_domain.create({
      data: {
        domain: formDomain.domain,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.tb_domain.delete({
      where: { id_domain: Number(id) },
    });
  }
}
