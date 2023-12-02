import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { useSocket } from '../utils/hooks/useSocket'
import { Action, Event, InputKeyCode, PlayerStatus, Room, inputKeyCodes } from '@red-tetris/common'
import Tetris from './game/Tetris'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { updateRoom } from '../redux/reducers/roomSlice'

//FIXME: this page render 2 times when the user join a room (join => leave => join)
//FIXME: there is way to render only once?
function GamePage() {
  const { players } = useSelector((state: RootState) => state.room)
  const dispatch = useDispatch()

  const { slug } = useParams()
  const { socket } = useSocket()
  const navigate = useNavigate()

  const regex = /^([^[]+)(?:\[(.*?)\])?$/
  const match = slug?.match(regex)
  const roomName = match?.[1]
  const userName = match?.[2] || 'Anonymous'
  const currentUser = players.find(player => player.name === userName)

  const GRID_COL = useMemo(() => Math.floor(players.length / 2), [players.length])

  const handleOnLeaveRoom = useCallback(() => {
    socket.emit(Event.LeaveRoom, { roomName })
    navigate('/')
  }, [navigate, roomName, socket])

  const sendKey = useCallback(
    (code: InputKeyCode) => {
      // console.log(`sendKey: ${roomName}, ${userName}, ${code}`)
      switch (code) {
        case 'ArrowLeft':
          return socket.emit(Event.SendAction, { roomName, userName, action: Action.MoveLeft })
        case 'ArrowRight':
          return socket.emit(Event.SendAction, { roomName, userName, action: Action.MoveRight })
        case 'ArrowDown':
          return socket.emit(Event.SendAction, { roomName, userName, action: Action.MoveDown })
        case 'ArrowUp':
          return socket.emit(Event.SendAction, { roomName, userName, action: Action.Rotate })
        case 'Space':
          return socket.emit(Event.SendAction, { roomName, userName, action: Action.Drop })
        default:
          return
      }
    },
    [roomName, userName]
  )

  const handleUserInput = useCallback(
    (e: KeyboardEvent) => {
      //FIXME: after Playing logic is implemented, change this to PLAYING
      // if (currentUser?.status === PlayerStatus.PLAYING) {
      if (currentUser?.status === PlayerStatus.READY && inputKeyCodes.includes(e.key as InputKeyCode)) {
        sendKey(e.key as InputKeyCode)
      }
    },
    [sendKey, currentUser]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleUserInput)
    return () => {
      window.addEventListener('keydown', handleUserInput)
    }
  }, [handleUserInput])

  useEffect(() => {
    //when user join game page, emit joinRoom event
    socket.emit(Event.JoinRoom, { roomName, userName })
    socket.on(Event.RoomInfo, (room: Room) => {
      dispatch(updateRoom(room))
    })
    return () => {
      //when user leave game page, emit leaveRoom event
      socket.off(Event.RoomInfo)
    }
  }, [dispatch, socket, roomName, userName])

  useEffect(() => {
    if (match === null) {
      handleOnLeaveRoom()
    }
  }, [slug, match, navigate, handleOnLeaveRoom])

  return (
    <Layout>
      <div className='flex'>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COL}, minmax(0, 1fr))` }}>
          {players &&
            players
              .filter(player => player.name !== userName)
              .map((player, i) => <Tetris key={`player[${i}]`} player={player} />)}
        </div>
        {players && currentUser && <Tetris player={currentUser} me />}
      </div>
    </Layout>
  )
}

export default GamePage
