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
}

export type Room = {
  name: string
  players: Player[]
  status: RoomStatus
}
