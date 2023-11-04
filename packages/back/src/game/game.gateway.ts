import {
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';

@WebSocketGateway({ path: '/', cors: '*' })
export class GameGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
