import { useEffect, useState } from 'react'
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

  useEffect(() => {
    //when user join game page, emit joinRoom event
    socket.emit('joinRoom', { roomName, userName })
    socket.on('roomInfo', players => {
      setUsers(players)
    })
    return () => {
      //when user leave game page, emit leaveRoom event
      // socket.emit('leaveRoom', { roomName })
      socket.off('roomInfo')
    }
  }, [])

  useEffect(() => {
    if (match === null) {
      // slug did not match the regex
      socket.emit('leaveRoom', { roomName })
      navigate('/')
    }
  }, [slug, match, navigate])

  return (
    <Layout>
      <DefaultButton label={'Back'} onClick={() => navigate('/')} />
      <div className='flex justify-center w-full'>
        {users && users.map((user, i) => <Tetris key={`player[${i}]`} player={user} />)}
      </div>
    </Layout>
  )
}

export default GamePage
