import { useNavigate } from 'react-router-dom'
import { useSocket } from '../utils/hooks/useSocket'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useCallback, useMemo } from 'react'
import { Event } from '@red-tetris/common'
import { updateName } from '../redux/reducers/roomSlice'
/* eslint import/no-webpack-loader-syntax: off */
import logo from '!file-loader!../assets/images/42_logo.svg'

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

  const isInRoom = useMemo(() => name.length > 0, [name])

  const handleOnClickLeft = useCallback(() => {
    if (isInRoom) handleOnLeaveRoom()
  }, [isInRoom, handleOnLeaveRoom])

  const leftText = useMemo(() => {
    return isInRoom ? (
      <div className={`${isInRoom ? 'hover:cursor-pointer' : ''} hover:text-white`} onClick={handleOnClickLeft}>
        Back
      </div>
    ) : (
      <img src={logo} alt='logo' className='w-7 h-7' />
    )
  }, [isInRoom, handleOnClickLeft])

  const centerText = useMemo(() => {
    return isInRoom ? name : 'RED Tetris'
  }, [isInRoom, name])

  return (
    <nav className='w-full h-10 flex justify-between items-center px-2 transition bg-neutral-700 text-gray-200 hover:bg-neutral-800'>
      {leftText}
      <div className='hover:text-white'>{centerText}</div>
      <div className={`w-10 border rounded-full`} onClick={() => {}}>
        <div className={`w-4 h-4 bg-neutral-300 dark:bg-white rounded-full m-0.5`}></div>
      </div>
    </nav>
  )
}
export default Navbar
