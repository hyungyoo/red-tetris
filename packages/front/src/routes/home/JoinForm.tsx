import { useCallback } from 'react'
import InputField from '../../components/InputField'
import Section from '../../components/Section'
import { useNavigate } from 'react-router-dom'
import DefaultButton from '../../components/DefaultButton'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { updateRoomName, updateUserName } from '../../redux/reducers/joinSlice'
import { RootState } from '../../redux/store'

function JoinForm() {
  const navigate = useNavigate()
  const disatch = useAppDispatch()
  // TODO: replace logic with redux
  const { roomName, userName } = useAppSelector((state: RootState) => state.join)

  const setRoomName = useCallback(
    (value: string) => {
      disatch(updateRoomName({ roomName: value }))
    },
    [disatch]
  )

  const setUserName = useCallback(
    (value: string) => {
      disatch(updateUserName({ userName: value }))
    },
    [disatch]
  )

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate(`${roomName}[${userName}]`)
  }

  return (
    <Section title='Welcome'>
      <Section title='Join Room'>
        <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 justify-center w-96 h-full'>
          <InputField label={'user name'} type={'text'} name={userName} value={userName} setValue={setUserName} />
          <InputField label={'room name'} type={'text'} name={roomName} value={roomName} setValue={setRoomName} />
          <DefaultButton type='submit' label='Join' />
        </form>
      </Section>
    </Section>
  )
}

export default JoinForm
