import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useSocket } from '../utils/hooks/useSocket'
import { Event } from '@red-tetris/common'
import { useNavigate } from 'react-router-dom'
import DefaultButton from './DefaultButton'
import { updateName } from '../redux/reducers/roomSlice'
//TODO: to implement later dark/light toggle
function Navbar() {
  const { socket } = useSocket()
  const navigate = useNavigate()
  const { name } = useSelector((state: RootState) => state.room)
  const dispatch = useDispatch()

  const handleOnLeaveRoom = useCallback(() => {
    socket.emit(Event.LeaveRoom, { roomName: name })
    dispatch(updateName(''))
    navigate('/')
  }, [navigate, name, socket, dispatch])

  return (
    <nav className='w-full flex justify-between z-10 top-0 left-0 p-4 absolute'>
      {name.length > 0 ? <DefaultButton label={'Back'} onClick={handleOnLeaveRoom} /> : <div>42</div>}
      <div>{name.length > 0 ? name : 'RED Tetris'}</div>
      <div className={`w-10 h-full border rounded-full`} onClick={() => {}}>
        <div className={`w-4 h-4 bg-neutral-300 dark:bg-white rounded-full m-0.5`}></div>
      </div>
    </nav>
  )
}
function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className='w-full h-screen dark:bg-neutral-900 dark:text-white'>
      <Navbar />
      <div className='w-full h-full flex items-center justify-center'>{children}</div>
    </div>
  )
}
export default Layout
