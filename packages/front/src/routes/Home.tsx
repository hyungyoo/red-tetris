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

    // socket.on("test2", data => {
    //   console.log(data)
    // })

    return () => {
      socket.off(Event.Connect)
      socket.off(Event.RoomList)
      // socket.off("test2")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  return (
    <Layout>
      {/* <div className='flex w-full justify-center'> */}
      <JoinForm />
      <RoomList rooms={roomList} />
      {/* <button onClick={()=> {
          socket.emit("test", "hello test")
        }}>test</button> */}
      {/* </div> */}
    </Layout>
  )
}

export default HomePage
