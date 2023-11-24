import { useNavigate } from 'react-router-dom'
import { useSocket } from '../utils/hooks/useSocket'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useCallback, useMemo } from 'react'
import { Event } from '@red-tetris/common'
import { updateName } from '../redux/reducers/roomSlice'
import logo_white from '../assets/images/42_white.svg'
import logo_black from '../assets/images/42_black.png'

//TODO: to implement later dark/light toggle
function Navbar() {
  const { socket } = useSocket()
  const navigate = useNavigate()
  const { name } = useSelector((state: RootState) => state.room)
  const dispatch = useDispatch()

  const isDark = useMemo(() => window.matchMedia('(prefers-color-scheme: dark)').matches, [])

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
      <div
        className={`${isInRoom ? 'hover:cursor-pointer' : ''} hover:text-neutral-700 dark:hover:text-white`}
        onClick={handleOnClickLeft}
      >
        Back
      </div>
    ) : (
      <img src={isDark ? logo_white : logo_black} alt='logo' className='w-7 h-7' />
    )
  }, [isInRoom, handleOnClickLeft, isDark])

  const centerText = useMemo(() => {
    return isInRoom ? name : 'RED Tetris'
  }, [isInRoom, name])

  return (
    <nav className='w-full h-10 flex justify-between items-center px-2 transition bg-white/30 hover:bg-white/10'>
      {leftText}
      <div className='hover:text-neutral-700 dark:hover:text-white'>{centerText}</div>
      <div className={`w-10 border rounded-full`} onClick={() => {}}>
        <div className={`w-4 h-4 bg-neutral-300 dark:bg-white rounded-full m-0.5`}></div>
      </div>
    </nav>
  )
}
export default Navbar
