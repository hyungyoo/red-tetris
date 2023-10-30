import Section from '../../components/Section'

export enum RoomStatus {
  WAITING = 'waiting',
  PLAYING = 'playing'
}

export type Player = {
  id?: string // player socket id => need??
  name: string
  score?: number
}

export type Room = {
  id?: string // room socket id => need??
  name: string
  players: Player[]
  status: RoomStatus
}

interface RoomListProps {
  rooms: Room[]
  //   onJoin: (roomId: string) => void
  //   onCreate: () => void
}
function RoomList(props: RoomListProps) {
  return (
    <Section title='Room List'>
      <ul className='w-full'>
        {props.rooms.map((room, i) => (
          <li key={`room[${i}]`} className='flex justify-between w-full'>
            <Section title={room.name}>
              <ul className='w-96'>
                {room.players.length && room.players.map((p, j) => <li key={`player_name[${j}]`}>{p.name}</li>)}
              </ul>
            </Section>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default RoomList
