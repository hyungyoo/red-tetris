import { RootState } from '../redux/store'
import JoinForm from './home/JoinForm'
// import RoomList, { Room } from './home/RoomList'

// const TEST_ROOMS: Room[] = [
//   {
//     id: 1,
//     name: 'room1',
//     players: ['hyungyoo', 'kychoi']
//   },
//   {
//     id: 2,
//     name: 'room2',
//     players: ['seyun', 'dolee']
//   },
//   {
//     id: 3,
//     name: 'room3',
//     players: ['sucho', 'cjung-mo']
//   }
// ]

function Home() {
  
  return (
    <div className='flex justify-center w-full'>
      <JoinForm />
      {/* <RoomList rooms={TEST_ROOMS} /> */}
    </div>
  )
}

export default Home
