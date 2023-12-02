import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  JoinRoomPayload,
  Player,
  PlayerStatus,
  Room,
  RoomStatus,
} from './interfaces/game-type.interface';
import { WebSocketServer } from '@nestjs/websockets';
import { Event } from './interfaces/game-event.interface';

@Injectable()
export class GameService {
  /**
   *
   * @param client
   * @param payload
   * @param roomList
   */
  createRoom(
    client: Socket,
    payload: JoinRoomPayload,
    roomList: Map<string, Room>,
    playerList: Map<string, Player>,
    server: Server,
  ) {
    const { roomName, userName } = payload;
    const currentPlayer = this.createPlayer(userName);

    const room = {
      name: roomName,
      players: [currentPlayer],
      status: RoomStatus.WAITING,
    };

    playerList.set(client.id, currentPlayer);
    roomList.set(roomName, room);

    client.join(roomName);

    server.to(roomName).emit(Event.RoomInfo, room);
    server.emit(Event.RoomList, Array.from(roomList.values()));
  }

  /**
   *
   * @param client
   * @param payload
   * @param roomList
   * @returns
   */
  updateRoom(
    client: Socket,
    payload: JoinRoomPayload,
    roomList: Map<string, Room>,
    playerList: Map<string, Player>,
    server: Server,
  ) {
    const { roomName, userName } = payload;

    const currentPlayer = this.createPlayer(userName);
    const currentRoom = roomList.get(roomName);

    const hasPlayer = currentRoom.players.find(
      (player) => player.name === userName,
    );
    if (!hasPlayer) {
      currentRoom.players = [...currentRoom.players, currentPlayer];
      roomList.set(roomName, currentRoom);
    }

    playerList.set(client.id, currentPlayer);
    client.join(roomName);

    server.to(roomName).emit(Event.RoomInfo, currentRoom);
    server.emit(Event.RoomList, Array.from(roomList.values()));
  }

  leaveRoom(client: Socket) {
    console.log('leave room');
  }

  /**
   *
   * @param userName
   * @returns
   */
  private createPlayer(userName: string) {
    return {
      name: userName,
      status: PlayerStatus.WAITING,
      //FIXME: create a enum for color in type.ts is better or use defined tailwinds color - ex: send color: 'red-500' to client
      tetrisMap: {
        '1-10': { color: '#333' },
        '1-11': { color: '#333' },
        '2-9': { color: '#333' },
        '2-11': { color: '#333' },
        '3-8': { color: '#333' },
        '3-11': { color: '#333' },
        '4-7': { color: '#333' },
        '4-11': { color: '#333' },
        '4-12': { color: '#333' },
        '6-7': { color: '#333' },
        '6-10': { color: '#333' },
        '6-11': { color: '#333' },
        '7-7': { color: '#333' },
        '7-9': { color: '#333' },
        '7-11': { color: '#333' },
        '8-7': { color: '#333' },
        '8-8': { color: '#333' },
        '8-11': { color: '#333' },
      },
    };
  }
}
