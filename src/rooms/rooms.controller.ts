import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  createRoom(@Body() body: { name: string; accessPassword: string; adminPassword: string }) {
    return this.roomsService.createRoom(body);
  }

  @Post('validate')
  validateAccess(@Body() body: { name: string; password: string }) {
    return this.roomsService.validateAccess(body.name, body.password);
  }

  @Post(':name/heart')
  incrementHeart(@Param('name') name: string) {
    return this.roomsService.incrementHeartCount(name);
  }

  @Get(':name')
  getRoom(@Param('name') name: string) {
    return this.roomsService.getRoom(name);
  }
}
