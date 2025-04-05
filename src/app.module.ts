import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { PrismaService } from './prisma.service';
import { HeartsGateway } from './hearts.gateway';

@Module({
  imports: [RoomsModule],
  providers: [PrismaService, HeartsGateway],
})
export class AppModule {}
