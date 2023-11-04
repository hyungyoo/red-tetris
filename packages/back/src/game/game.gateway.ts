import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Event } from './interface/event.interface';

@WebSocketGateway({ path: '/', cors: '*' })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage(Event.Message)
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
