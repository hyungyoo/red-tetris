import { useEffect } from 'react'
import Layout from '../components/Layout'
import JoinForm from './home/JoinForm'
import RoomList, { Room, RoomStatus } from './home/RoomList'
import { io } from 'socket.io-client'

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
  useEffect(() => {
    // Replace 'http://localhost:YOUR_SERVER_PORT' with the actual URL of your Socket.IO server.
    // FIXME: change to env
    const socket = io(`http://localhost:9000`)

    // Set up event listeners or perform actions with the socket
    socket.on('connect', () => {
      console.log('Connected to the server')
    })

    socket.on('customEvent', data => {
      console.log('Received custom event:', data)
    })

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect()
    }
  }, [])
  return (
    <Layout>
      <JoinForm />
      <RoomList rooms={TEST_ROOMS} />
    </Layout>
  )
}

export default Home
