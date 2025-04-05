import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async createRoom(data: {
    name: string;
    accessPassword: string;
    adminPassword: string;
  }): Promise<Room> {
    return this.prisma.room.create({ data });
  }

  async validateAccess(
    name: string,
    password: string,
  ): Promise<'admin' | 'user' | null> {
    const room = await this.prisma.room.findUnique({ where: { name } });
    if (!room) return null;
    if (room.adminPassword === password) return 'admin';
    if (room.accessPassword === password) return 'user';
    return null;
  }

  async incrementHeartCount(name: string): Promise<Room> {
    return this.prisma.room.update({
      where: { name },
      data: { heartCount: { increment: 1 } },
    });
  }

  async getRoom(name: string): Promise<Room | null> {
    return this.prisma.room.findUnique({ where: { name } });
  }
}
