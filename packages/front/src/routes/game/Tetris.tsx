import { Event, GAME_MAP_HEIGHT_SIZE, GAME_MAP_WIDTH_SIZE, Player, PlayerStatus } from '@red-tetris/common'
import Section from '../../components/Section'
import { useCallback, useMemo } from 'react'
import DefaultButton from '../../components/DefaultButton'
import { useSocket } from '../../utils/hooks/useSocket'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

interface TetrisProps {
  player: Player
  me?: boolean
}
//TODO
function Tetris(props: TetrisProps) {
  const { socket } = useSocket()
  const { player, me } = props
  const { name, status, tetrisMap } = player
  const { name: roomName } = useSelector((state: RootState) => state.room)
  const BLOCK_SIZE = me ? '1.65rem' : '0.75rem'

  const drawMap = useCallback(() => {
    if (!tetrisMap) return null

    const map = []

    for (let y = 0; y < GAME_MAP_HEIGHT_SIZE; y++) {
      for (let x = 0; x < GAME_MAP_WIDTH_SIZE; x++) {
        const current = tetrisMap[`${x}-${y}`]
        map.push(
          <div
            key={`${x}-${y}`}
            className={`${x}-${y} border border-dotted border-gray-200 dark:border-neutral-700`}
            style={{
              background: current ? `linear-gradient(300deg, ${current.color}, #eee)` : 'inherit',
              width: BLOCK_SIZE,
              height: BLOCK_SIZE
            }}
          />
        )
      }
    }
    return map
  }, [tetrisMap, BLOCK_SIZE])

  const handleOnChangePlayerStatus = useCallback(() => {
    socket.emit(Event.ChangePlayerStatus, {
      roomName,
      status: status === PlayerStatus.READY ? PlayerStatus.WAITING : PlayerStatus.READY
    })
  }, [socket, status, roomName])

  const statusDiv = useMemo(() => {
    if (status === PlayerStatus.PLAYING) return null
    return (
      <div
        className={`
          w-full h-2/5 absolute
          text-base text-center capitalize text-gray-50
          bg-neutral-900/30
          dark:bg-gray-200/30
          flex justify-center items-center flex-col
        `}
      >
        {me && (
          <DefaultButton
            label={status === PlayerStatus.READY ? 'Cancel' : PlayerStatus.READY}
            onClick={handleOnChangePlayerStatus}
          />
        )}
        {!me && status}
      </div>
    )
  }, [status, me, handleOnChangePlayerStatus])

  return (
    <Section title={name} center>
      <div className={`w-full h-full grid grid-cols-10 gap-0`}>{drawMap()}</div>
      {statusDiv}
    </Section>
  )
}

export default Tetris
