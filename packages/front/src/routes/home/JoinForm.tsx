import { useState } from 'react'
import InputField from '../../components/InputField'
import Block from '../../components/Block'
import { useNavigate } from 'react-router-dom'
import DefaultButton from '../../components/DefaultButton'

function JoinForm() {
  const navigate = useNavigate()
  // TODO: replace logic with redux
  const [userName, setUserName] = useState<string>('')
  const [roomName, setRoomName] = useState<string>('')

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate(`${roomName}[${userName}]`)
  }
  return (
    <Block title='Join Room'>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 justify-center'>
        <InputField label={'user name'} type={'text'} name={userName} value={userName} setValue={setUserName} />
        <InputField label={'room name'} type={'text'} name={roomName} value={roomName} setValue={setRoomName} />
        <DefaultButton type='submit' label='Join' />
      </form>
    </Block>
  )
}

export default JoinForm
