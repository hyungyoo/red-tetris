import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import JoinForm from './home/JoinForm'
import RoomList from './home/RoomList'
import { Event, Room } from '@red-tetris/common'
import { useSocket } from '../utils/hooks/useSocket'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateRoomList } from '../redux/reducers/roomListSlice'

function HomePage() {
  const { socket } = useSocket()

  const dispatch = useDispatch()
  const roomList = useSelector((state: RootState) => state.roomList)

  useEffect(() => {
    // Set up event listeners or perform actions with the socket
    socket.on(Event.Connect, () => {
      socket.emit(Event.GetRoomList)
    })
    socket.on(Event.RoomList, (data: Room[]) => {
      dispatch(updateRoomList(data))
    })

    return () => {
      socket.off(Event.Connect)
      socket.off(Event.RoomList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  return (
    <Layout>
      <JoinForm />
      <RoomList rooms={roomList} />
    </Layout>
  )
}

export default HomePage
