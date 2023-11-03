import { useEffect } from 'react'
import Layout from '../components/Layout'
import JoinForm from './home/JoinForm'
import RoomList, { Room, RoomStatus } from './home/RoomList'
import { useSocket } from '../utils/hooks/useSocket'

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
  const { socket } = useSocket()
  useEffect(() => {
    // Set up event listeners or perform actions with the socket
    console.log(socket)
    socket.on('connect', () => {
      socket.emit('getRoomList')
    })

    socket.on('roomList', data => {
      // TODO: dispatch roomList using redux
      console.log('rooms:', data);
    })

    return () => {
      // Clean up the socket connection when the component unmounts
      // socket.disconnect()
    }
  }, [])
  return (
    <Layout>
      <div className='flex justify-center h-full'>
        <JoinForm />
        <RoomList rooms={TEST_ROOMS} />
      </div>
    </Layout>
  )
}

export default Home
