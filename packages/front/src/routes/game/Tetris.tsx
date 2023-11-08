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
  const BLOCK_SIZE = me ? 8 : 4
  const GRID_WIDTH = me ? 80 : 40
  const GRID_HEIGHT = me ? 'full' : '1/2'

  const drawMap = useCallback(() => {
    if (!tetrisMap) return null

    const map = []

    for (let y = 0; y < GAME_MAP_HEIGHT_SIZE; y++) {
      for (let x = 0; x < GAME_MAP_WIDTH_SIZE; x++) {
        const current = tetrisMap[`${x}-${y}`]
        map.push(
          <div
            key={`${x}-${y}`}
            className={`${x}-${y} w-${BLOCK_SIZE} h-${BLOCK_SIZE} border border-gray-100`}
            style={{ backgroundColor: current ? current.color : 'inherit' }}
          />
        )
      }
    }
    return map
  }, [tetrisMap])

  return (
    <Section title={`${name}(${status})`}>
      <div className={`w-${GRID_WIDTH} h-${GRID_HEIGHT} grid grid-cols-10`}>{drawMap()}</div>
    </Section>
  )
}

export default Tetris
