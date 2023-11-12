import { useNavigate } from 'react-router-dom'
import { useSocket } from '../utils/hooks/useSocket'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useCallback } from 'react'
import { Event } from '@red-tetris/common'
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
    <nav className='w-full flex justify-between items-center p-2 bg-gray-50 dark:bg-neutral-700'>
      {name.length > 0 ? <div onClick={handleOnLeaveRoom}>Back</div> : <div>42</div>}
      <div>{name.length > 0 ? name : 'RED Tetris'}</div>
      <div className={`w-10 h-full border rounded-full`} onClick={() => {}}>
        <div className={`w-4 h-4 bg-neutral-300 dark:bg-white rounded-full m-0.5`}></div>
      </div>
    </nav>
  )
}
export default Navbar
