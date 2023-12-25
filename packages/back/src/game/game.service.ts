import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  ChangePlayerStatusPayload,
  JoinRoomPayload,
  Player,
  PlayerStatus,
  Room,
  RoomStatus,
} from './interfaces/game-type.interface';
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
    const currentPlayer = this.createPlayer(client.id, userName);

    const room = {
      name: roomName,
      players: [currentPlayer],
      status: RoomStatus.WAITING,
    };

    playerList.set(client.id, currentPlayer);
    roomList.set(roomName, room);

    client.join(roomName);

    this.emitUpdatedRoom(server, roomName, room, roomList);
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

    const currentPlayer = this.createPlayer(client.id, userName);
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

    this.emitUpdatedRoom(server, roomName, currentRoom, roomList);
  }

  /**
   *
   * @param client
   * @param roomList
   * @param playerList
   */
  leaveRoom(
    client: Socket,
    roomList: Map<string, Room>,
    playerList: Map<string, Player>,
    server: Server,
  ) {
    const { id, rooms } = client;

    let roomName = Array.from(rooms).find((room) => room !== id);
    let currentRoom = roomList.get(roomName);

    //Manage case when user close browser
    //Best practice => util function which find and update ghost player(like garbege collector)
    if (!rooms.size) {
      roomList.forEach((room) => {
        if (room.players.find((player) => player.id === id)) {
          currentRoom = room;
          roomName = room.name;
        }
      });
    }

    if (currentRoom) {
      currentRoom.players = currentRoom.players.filter(
        (player) => player.id !== id,
      );
      if (!currentRoom.players.length) {
        roomList.delete(roomName);
      }
      playerList.delete(id);
    }

    client.leave(roomName);
    this.emitUpdatedRoom(server, roomName, currentRoom, roomList);
  }

  /**
   *
   * @param client
   * @param payload
   * @param roomList
   * @param playerList
   * @param server
   */
  changePlayerStatus(
    client: Socket,
    payload: ChangePlayerStatusPayload,
    roomList: Map<string, Room>,
    playerList: Map<string, Player>,
    server: Server,
  ) {
    const { id } = client;
    const { roomName, status } = payload;

    const targetPlayer = playerList.get(id);
    const currentRoom = roomList.get(roomName);

    currentRoom.players = currentRoom.players.map((player) => {
      if (player.name === targetPlayer.name) {
        player.status = status;
      }
      return player;
    });

    playerList.set(id, { ...targetPlayer, status });

    // all players ready, room status => play , players => play

    server.to(roomName).emit(Event.RoomInfo, currentRoom);
  }

  /**
   *
   * @param userName
   * @returns
   */
  private createPlayer(clientId: string, userName: string) {
    return {
      id: clientId,
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

  /**
   *
   * @param server
   * @param roomName
   * @param currentRoom
   * @param roomList
   */
  private emitUpdatedRoom(
    server: Server,
    roomName: string,
    currentRoom: Room,
    roomList: Map<string, Room>,
  ) {
    //FIXME: when close browser, roomName and currentRoom is undefined => see game.service.leaveRoom()
    //console.log('emitUpdatedRoom', roomName, currentRoom, roomList);
    server.to(roomName).emit(Event.RoomInfo, currentRoom);
    server.emit(Event.RoomList, Array.from(roomList.values()));
  }
}
