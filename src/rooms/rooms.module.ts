// rooms.module.ts
import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { PrismaService } from '../prisma.service';
import { HeartsGateway } from '../hearts.gateway';

@Module({
  providers: [RoomsService, PrismaService, HeartsGateway],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
