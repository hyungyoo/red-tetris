import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import JoinForm from './home/JoinForm'
import RoomList from './home/RoomList'
import { Event, Room } from '@red-tetris/common'
import { useSocket } from '../utils/hooks/useSocket'

function HomePage() {
  const { socket } = useSocket()
  // use Redux instead of useState
  const [roomList, setRoomList] = useState<Room[]>([])

  useEffect(() => {
    // Set up event listeners or perform actions with the socket
    socket.on(Event.Connect, () => {
      socket.emit(Event.GetRoomList)
    })
    socket.on(Event.RoomList, data => {
      // TODO: dispatch roomList using redux
      setRoomList(data)
    })
    return () => {
      socket.off(Event.Connect)
      socket.off(Event.RoomList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout>
      <div className='flex justify-center items-center h-full'>
        <JoinForm />
        <RoomList rooms={roomList} />
      </div>
    </Layout>
  )
}

export default HomePage
