import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { useSocket } from '../utils/hooks/useSocket'
import Section from '../components/Section'
import DefaultButton from '../components/DefaultButton'

function GamePage() {
  const { slug } = useParams()
  const { socket } = useSocket()
  const navigate = useNavigate()

  const regex = /^(\w+)(?:\[(.*?)\])?$/
  const match = slug?.match(regex)
  const roomName = match?.[1]
  const userName = match?.[2] || 'Anonymous'

  useEffect(() => {
    socket.emit("joinRoom", {roomName, userName});
    return () => {
    //TODO: leave room emit when component unmounted
      socket.emit("leaveRoom", {roomName});
    // Clean up the socket connection when the component unmounts
    // socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (match === null)
      // slug did not match the regex
      navigate('/')
  }, [slug, match, navigate])

  return (
    <Layout>
      <DefaultButton label={'Back'} onClick={() => navigate('/')} />
      <div className='flex justify-center'>
        <Section title='Game'>
          <h1>Room name: {roomName}</h1>
          <h1>User name: {userName}</h1>
        </Section>
      </div>
    </Layout>
  )
}

export default GamePage
