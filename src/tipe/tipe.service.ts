import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TipeChart } from 'src/type/typeDto';

@Injectable()
export class TipeService {
  constructor(private readonly prisma: PrismaService) {}

  async getTipe() {
    const query = await this.prisma.tb_tipe.findMany({
      orderBy: {
        time_stamp: 'asc',
      },
      include: {
        tb_indikator: {
          include: {
            skor: true,
          },
        },
      },
    });
    //console.log(query);

    const newData: TipeChart[] = query.map((c_query) => ({
      id: String(c_query.id_tipe),
      name: c_query.nama_tipe,
      value: c_query.tb_indikator.map((indi) => ({
        id: String(indi.id_indikator),
        name: indi.nama_indikator,
        skor: indi.skor.map((s) => ({
          id: String(s.id_skor),
          nilai: s.skor, // Ambil nilai skor dari setiap skor
        })),
      })),
    }));
    //  console.log(newData);

    return newData;
  }
}
