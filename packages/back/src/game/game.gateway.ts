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
    console.log("hello")
    return 'Hello world!';
  }

  @SubscribeMessage(Event.JoinRoom)
  handleJoinRoom(client: any, payload: any): string {
    console.log("hello")
    return 'Hello world!';
  }

  @SubscribeMessage(Event.GetRoomList)
  handleGetRoomList(client: any, payload: any): string {
    console.log("hello")
    return 'Hello world!';
  }

  @SubscribeMessage(Event.Disconnecting)
  handleDisconnecting(client: any, payload: any): string {
    console.log("hello2")
    return 'Hello world!';
  }
}
