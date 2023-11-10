import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
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
  handleGetRoomList(@MessageBody() data: unknown): WsResponse<unknown> {
    console.log(`${Event.GetRoomList}`)
    console.log(data)
    
    return;
  }

  @SubscribeMessage(Event.Disconnecting)
  handleDisconnecting(client: any, payload: any): string {
    console.log(`${Event.Disconnecting}`)
    return;
  }

  @SubscribeMessage('test')
  handleTest(@MessageBody() data: unknown): WsResponse<unknown> {
    console.log(data)
    this.server.emit("test2", "all")
    return { event :"test2", data: "test! front"};
  }
}
