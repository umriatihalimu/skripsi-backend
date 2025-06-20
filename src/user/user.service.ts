import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser() {
    return await this.prisma.user.findMany({
      orderBy: {
        id_username: 'asc', // atau 'desc' untuk urutan menurun
      },
    });
  }

  async createUser(dataUser: user) {
    const passwordBcrypt = bcrypt.hashSync(dataUser.password, 10);
    return await this.prisma.user.create({
      data: {
        nama_user: dataUser.nama_user,
        username: dataUser.username,
        password: passwordBcrypt,
        tipe_user: dataUser.tipe_user,
      },
    });
  }
  async delete(id: string) {
    return await this.prisma.user.delete({
      where: { id_username: Number(id) },
    });
  }
}
