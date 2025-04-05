import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { RoomsService } from './rooms/rooms.service';

@WebSocketGateway({ cors: true })
export class HeartsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly roomsService: RoomsService) {}

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
  }

  @SubscribeMessage('spawnHeart')
  async handleSpawnHeart(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this.roomsService.incrementHeartCount(data.roomId);
    client.to(data.roomId).emit('heartSpawned');
  }
}
