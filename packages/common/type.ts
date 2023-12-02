export enum RoomStatus {
  WAITING = 'waiting',
  PLAYING = 'playing'
}

export enum PlayerStatus {
  WAITING = 'waiting',
  READY = 'ready',
  PLAYING = 'playing'
}

export const inputKeyCodes = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'] as const;
export type InputKeyCode = typeof inputKeyCodes[number];

export enum Action {
  MoveLeft = 'moveLeft',
  MoveRight = 'moveRight',
  MoveDown = 'moveDown',
  Rotate = 'rotate',
  Drop = 'drop'
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

export type RoomName = string