import Section from '../../components/Section'

export type Room = {
  id: number
  name: string
  players: string[]
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
        {props.rooms.map(room => (
          <li key={room.id} className='flex justify-between w-full'>
            <Section title={room.name}> </Section>
            <ul>{room.players.length && room.players.map(p => <li>{p}</li>)}</ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default RoomList
