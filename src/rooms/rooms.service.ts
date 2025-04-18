import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateRoomDto } from './dtos/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async createRoom(data: CreateRoomDto): Promise<Room> {
    return this.prisma.room.create({ data });
  }

  async validateAccess(name: string, password: string): Promise<boolean> {
    const room = await this.prisma.room.findUnique({ where: { name } });
    if (!room) throw new NotFoundException(`Room with name ${name} not found`);
    if (room.accessPassword !== password)
      throw new UnauthorizedException('Invalid access password');
    return true;
  }

  async validateAdmin(name: string, password: string): Promise<boolean> {
    const room = await this.prisma.room.findUnique({ where: { name } });
    if (!room) throw new NotFoundException(`Room with name ${name} not found`);
    if (room.adminPassword !== password)
      throw new UnauthorizedException('Invalid admin password');
    return true;
  }

  async incrementHeartCount(name: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({ where: { name } });
    if (!room) throw new NotFoundException(`Room with name ${name} not found`);

    return this.prisma.room.update({
      where: { name },
      data: { heartCount: { increment: 1 } },
    });
  }

  async getRoom(name: string): Promise<Room | null> {
    const room = await this.prisma.room.findUnique({ where: { name } });
    if (!room) throw new NotFoundException(`Room with name ${name} not found`);
    return room;
  }
}
