import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [RoomsService, PrismaService],
  controllers: [RoomsController],
})
export class RoomsModule {}
