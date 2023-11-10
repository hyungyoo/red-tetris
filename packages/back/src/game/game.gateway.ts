import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Event } from '@red-tetris/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ path: '/', cors: '*' })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(Event.LeaveRoom)
  handleLeaveRoom(client: any, payload: any): string {
    console.log(`${Event.LeaveRoom}`)
    return;
  }

  @SubscribeMessage(Event.JoinRoom)
  handleJoinRoom(client: any, payload: any): string {
    console.log(`${Event.JoinRoom}`)
    return;
  }

  @SubscribeMessage(Event.GetRoomList)
  handleGetRoomList(client: any, payload: any): string {
    console.log(`${Event.GetRoomList}`)
    return;
  }

  @SubscribeMessage(Event.Disconnecting)
  handleDisconnecting(client: any, payload: any): string {
    console.log(`${Event.Disconnecting}`)
    return;
  }
}
