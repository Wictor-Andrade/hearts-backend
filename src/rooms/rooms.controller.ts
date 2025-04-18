import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dtos/create-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('create')
  createRoom(@Body() body: CreateRoomDto) {
    return this.roomsService.createRoom(body);
  }

  @Post('validate-access')
  validateAccess(@Body() body: { name: string; password: string }) {
    return this.roomsService.validateAccess(body.name, body.password);
  }

  @Post('validate-admin')
  validateAdmin(@Body() body: { name: string; password: string }) {
    return this.roomsService.validateAdmin(body.name, body.password);
  }

  @Post(':name/heart')
  incrementHeart(@Param('name') name: string) {
    return this.roomsService.incrementHeartCount(name);
  }

  @Get('find/:name')
  getRoom(@Param('name') name: string) {
    return this.roomsService.getRoom(name);
  }
}
