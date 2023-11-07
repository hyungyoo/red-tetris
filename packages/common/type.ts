export enum RoomStatus {
  WAITING = 'waiting',
  PLAYING = 'playing'
}

export enum PlayerStatus {
  WAITING = 'waiting',
  READY = 'ready',
  PLAYING = 'playing'
}

export type Player = {
  name: string
  score?: number
  status: PlayerStatus
  tetrisMap?: TetrisMap
}

export type Room = {
  name: string
  players: Player[]
  status: RoomStatus
}

export type Coordinate = `${number}-${number}` // x-y

export type Block = {
  color: string // hex(#ffffff) or rgb(255,255,255)
}
export type TetrisMap = Record<Coordinate, Block>

export const GAME_MAP_WIDTH_SIZE = 10;
export const GAME_MAP_HEIGHT_SIZE = 20;
