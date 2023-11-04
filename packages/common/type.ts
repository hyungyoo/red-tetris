export enum RoomStatus {
  WAITING = 'waiting',
  PLAYING = 'playing'
}

export type Player = {
  name: string
  score?: number
  status: RoomStatus
}

export type Room = {
  name: string
  players: Player[]
  status: RoomStatus
}
