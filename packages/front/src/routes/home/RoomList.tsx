import Section from '../../components/Section'
import { Room } from '@red-tetris/common'

interface RoomListProps {
  rooms: Room[]
}
function RoomList(props: RoomListProps) {
  const { rooms } = props
  return (
      <Section title='Room List'>
        <ul className='w-96'>
          {rooms.length === 0 && <li className='text-center'>No room available</li>}
          {rooms.length > 0 &&
            rooms.map((room, i) => (
              <li key={`room[${i}]`} className='flex justify-between w-full'>
                <Section title={room.name}>
                  <ul className='w-80'>
                    {room.players.length > 0 && room.players.map((p, j) => <li key={`player_name[${j}]`}>{p.name}</li>)}
                  </ul>
                </Section>
              </li>
            ))}
        </ul>
      </Section>
  )
}

export default RoomList
