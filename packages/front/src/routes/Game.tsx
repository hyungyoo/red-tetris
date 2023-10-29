import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function GamePage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  console.log(slug)
  const regex = /^(\w+)(?:\[(.*?)\])?$/
  const match = slug?.match(regex)
  const roomName = match?.[1]
  const userName = match?.[2] || 'Anonymous'

  useEffect(() => {
    if (match === null)
      // slug did not match the regex
      navigate('/')
  }, [slug, match, navigate])

  return (
    <div>
      <h1>Room name: {roomName}</h1>
      <h1>User name: {userName}</h1>
    </div>
  )
}

export default GamePage
