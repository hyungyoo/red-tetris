import Section from '../../components/Section'
import { Room } from '@red-tetris/common'

interface RoomListProps {
  rooms: Room[]
  //   onJoin: (roomId: string) => void
  //   onCreate: () => void
}
function RoomList(props: RoomListProps) {
  const { rooms } = props
  return (
    <Section title='Room List'>
      <ul className='w-full'>
        {rooms &&
          rooms.map((room, i) => (
            <li key={`room[${i}]`} className='flex justify-between w-full'>
              <Section title={room?.name}>
                <ul className='w-96'>
                  {room.players?.length &&
                    room.players.map((p: any, j: any) => <li key={`player_name[${j}]`}>{p?.name}</li>)}
                </ul>
              </Section>
            </li>
          ))}
      </ul>
    </Section>
  )
}

export default RoomList
