import Block from '../../components/Block'

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
    <Block title='Room List'>
      <ul className='w-full'>
        {props.rooms.map(room => (
          <li key={room.id} className='flex justify-between w-full'>
            <Block title={room.name}> </Block>
            <ul>{room.players.length && room.players.map(p => <li>{p}</li>)}</ul>
          </li>
        ))}
      </ul>
    </Block>
  )
}

export default RoomList
