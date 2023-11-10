import { GAME_MAP_HEIGHT_SIZE, GAME_MAP_WIDTH_SIZE, Player } from '@red-tetris/common'
import Section from '../../components/Section'
import { useCallback } from 'react'

interface TetrisProps {
  player: Player
  me?: boolean
}
//TODO
function Tetris(props: TetrisProps) {
  const { player, me } = props
  const { name, status, tetrisMap } = player
  const BLOCK_SIZE = me ? '1.5rem' : '0.75rem'

  const drawMap = useCallback(() => {
    if (!tetrisMap) return null

    const map = []

    for (let y = 0; y < GAME_MAP_HEIGHT_SIZE; y++) {
      for (let x = 0; x < GAME_MAP_WIDTH_SIZE; x++) {
        const current = tetrisMap[`${x}-${y}`]
        map.push(
          <div
            key={`${x}-${y}`}
            className={`${x}-${y} border border-gray-100`}
            style={{ background: current ? `linear-gradient(300deg, ${current.color}, #eee)` : 'inherit', width:BLOCK_SIZE, height:BLOCK_SIZE }}
          />
        )
      }
    }
    return map
  }, [tetrisMap, BLOCK_SIZE])

  return (
    <Section title={`${name}(${status})`} center>
      <div className={`w-full h-full grid grid-cols-10 gap-0`}>{drawMap()}</div>
    </Section>
  )
}

export default Tetris
