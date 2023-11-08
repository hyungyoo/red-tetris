import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { useSocket } from '../utils/hooks/useSocket'
import DefaultButton from '../components/DefaultButton'
import { Player } from '@red-tetris/common'
import Tetris from './game/Tetris'

//FIXME: this page render 2 times when the user join a room (join => leave => join)
//FIXME: there is way to render only once?
function GamePage() {
  const [users, setUsers] = useState<Player[]>([])

  const { slug } = useParams()
  const { socket } = useSocket()
  const navigate = useNavigate()

  const regex = /^(\w+)(?:\[(.*?)\])?$/
  const match = slug?.match(regex)
  const roomName = match?.[1]
  const userName = match?.[2] || 'Anonymous'
  const currentUser = users.find(user => user.name === userName)

  const GRID_COL = useMemo(() => Math.floor(users.length / 2), [users.length])
  const handleOnLeaveRoom = useCallback(() => {
    socket.emit('leaveRoom', { roomName })
    navigate('/')
  }, [navigate, roomName, socket])

  useEffect(() => {
    //when user join game page, emit joinRoom event
    socket.emit('joinRoom', { roomName, userName })
    socket.on('roomInfo', players => {
      setUsers(players)
    })
    return () => {
      //when user leave game page, emit leaveRoom event
      socket.off('roomInfo')
    }
  }, [])

  useEffect(() => {
    if (match === null) {
      handleOnLeaveRoom()
    }
  }, [slug, match, navigate, handleOnLeaveRoom])

  return (
    <Layout>
      <DefaultButton label={'Back'} onClick={handleOnLeaveRoom} />
      <div className='flex justify-center w-full'>
        <div className={`grid grid-cols-${GRID_COL} h-1/2`}>
          {users &&
            users
              .filter(user => user.name !== userName)
              .map((user, i) => <Tetris key={`player[${i}]`} player={user} />)}
        </div>
        {users && currentUser && <Tetris player={currentUser} me />}
      </div>
    </Layout>
  )
}

export default GamePage
