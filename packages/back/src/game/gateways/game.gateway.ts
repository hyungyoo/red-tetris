import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '../game.service';
import { Event } from '../interfaces/game-event.interface';

@WebSocketGateway({ path: '/', cors: '*' })
export class GameGateway {
  constructor(private readonly gameService:GameService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(Event.LeaveRoom)
  handleLeaveRoom(client: Socket, payload: any): string {
    console.log(payload);
    console.log(`${Event.LeaveRoom}`);
    return;
  }

  @SubscribeMessage(Event.JoinRoom)
  handleJoinRoom(client: Socket, payload: any): string {
    console.log(Event.JoinRoom);
    console.log(payload);
    console.log(Event.JoinRoom);
    return;
  }

  @SubscribeMessage(Event.GetRoomList)
  handleGetRoomList(@MessageBody() data: unknown): WsResponse<unknown> {
    console.log(`${Event.GetRoomList}`);
    console.log(data);
    console.log(`${Event.GetRoomList}`);

    return;
  }

  @SubscribeMessage(Event.Disconnecting)
  handleDisconnecting(client: Socket, payload: any): string {
    console.log(`${Event.Disconnecting}`);
    console.log(payload);
    console.log(`${Event.Disconnecting}`);
    return;
  }
}
