import JoinForm from './home/JoinForm'
import RoomList, { Room } from './home/RoomList'
import tetris from '../assets/images/tetris.png'

const TEST_ROOMS: Room[] = [
  {
    id: 1,
    name: 'room1',
    players: ['hyungyoo', 'kychoi']
  },
  {
    id: 2,
    name: 'room2',
    players: ['seyun', 'dolee']
  },
  {
    id: 3,
    name: 'room3',
    players: ['sucho', 'cjung-mo']
  }
]

function Home() {
  return (
    <div className='w-full h-screen bg-tetris bg-cover relative'>
      <div className='w-full h-screen backdrop-blur-sm flex justify-center absolute top-0 left-0 p-32'>
        <JoinForm />
        <RoomList rooms={TEST_ROOMS} />
      </div>
    </div>
  )
}

export default Home
