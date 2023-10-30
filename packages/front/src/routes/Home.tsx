import Layout from '../components/Layout'
import JoinForm from './home/JoinForm'
import RoomList, { Room, RoomStatus } from './home/RoomList'

const TEST_ROOMS: Room[] = [
  {
    name: 'room1',
    status: RoomStatus.WAITING,
    players: [{ name: 'hyungyoo' }, { name: 'kychoi' }]
  },
  {
    name: 'room2',
    status: RoomStatus.WAITING,
    players: [{ name: 'hyungyoo' }, { name: 'kychoi' }]
  },
  {
    name: 'room3',
    status: RoomStatus.WAITING,
    players: [{ name: 'hyungyoo' }, { name: 'kychoi' }]
  }
]

function Home() {
  return (
    <Layout>
      <JoinForm />
      <RoomList rooms={TEST_ROOMS} />
    </Layout>
  )
}

export default Home
