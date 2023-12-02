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
import {
  JoinRoomPayload,
  Player,
  Room,
} from '../interfaces/game-type.interface';

@WebSocketGateway({ path: '/', cors: '*' })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  private readonly roomList: Map<string, Room>;
  private readonly playerList: Map<string, Player>;

  constructor(private readonly gameService: GameService) {
    this.roomList = new Map<string, Room>();
    this.playerList = new Map<string, Player>();
  }

  @SubscribeMessage(Event.LeaveRoom)
  handleLeaveRoom(client: Socket, payload: any): string {
    console.log(payload);
    console.log(`${Event.LeaveRoom}`);
    return;
  }

  /**
   *
   * @param client
   * @param payload
   * @returns
   */
  @SubscribeMessage(Event.JoinRoom)
  handleJoinRoom(client: Socket, payload: JoinRoomPayload) {
    const { roomName } = payload;
    const currentRoom = this.roomList.get(roomName);
    if (!currentRoom) {
      return this.gameService.createRoom(
        client,
        payload,
        this.roomList,
        this.playerList,
        this.server,
      );
    }
    return this.gameService.updateRoom(
      client,
      payload,
      this.roomList,
      this.playerList,
      this.server,
    );
  }

  @SubscribeMessage(Event.GetRoomList)
  handleGetRoomList(): WsResponse<Room[]> {
    console.log(this.roomList);
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
