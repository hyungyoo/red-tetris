import { GAME_MAP_HEIGHT_SIZE, GAME_MAP_WIDTH_SIZE, Player } from '@red-tetris/common'
import Section from '../../components/Section'
import { useCallback } from 'react'

interface TetrisProps {
  player: Player
}
//TODO
function Tetris(props: TetrisProps) {
  const { player } = props
  const { name, status, tetrisMap } = player

  const drawMap = useCallback(() => {
    if (!tetrisMap) return null

    const map = []

    for (let y = 0; y < GAME_MAP_HEIGHT_SIZE; y++) {
      for (let x = 0; x < GAME_MAP_WIDTH_SIZE; x++) {
        const current = tetrisMap[`${x}-${y}`]
        map.push(
          <div
            key={`${x}-${y}`}
            className={`${x}-${y} w-8 h-8 border border-gray-100`}
            style={{ backgroundColor: current ? current.color : 'inherit' }}
          />
        )
      }
    }
    return map
  }, [tetrisMap])

  return (
    <Section title={`${name}(${status})`}>
      <div className='w-80 h-full grid grid-cols-10'>{drawMap()}</div>
    </Section>
  )
}

export default Tetris
