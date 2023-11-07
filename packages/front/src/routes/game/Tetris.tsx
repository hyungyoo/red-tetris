import { Player } from '@red-tetris/common'
import Section from '../../components/Section'

interface TetrisProps {
  player: Player
}
//TODO
function Tetris(props: TetrisProps) {
  const { player } = props
  return (
    <Section title={`${player.name}(${player.status})`}>
      <div className='w-96 h-full'></div>
    </Section>
  )
}

export default Tetris
