import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import JoinForm from './home/JoinForm'
import RoomList from './home/RoomList'
import { Room } from '@red-tetris/common'
import { useSocket } from '../utils/hooks/useSocket'

function Home() {
  const { socket } = useSocket()
  // use Redux instead of useState
  const [roomList, setRoomList] = useState<Room[]>([])

  useEffect(() => {
    // Set up event listeners or perform actions with the socket
    socket.on('connect', () => {
      socket.emit('getRoomList')
    })

    socket.on('roomList', data => {
      // TODO: dispatch roomList using redux
      console.log("HERE ====", data);
      setRoomList(data)
    })

    console.log('socket changed')
    return () => {
      // Clean up the socket connection when the component unmounts
      // socket.disconnect()
    }
  }, [socket.connected])
  return (
    <Layout>
      <div className='flex justify-center h-full'>
        <JoinForm />
        <RoomList rooms={roomList} />
      </div>
    </Layout>
  )
}

export default Home
