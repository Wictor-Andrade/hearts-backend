import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [RoomsModule],
  providers: [PrismaService],
})
export class AppModule {}
