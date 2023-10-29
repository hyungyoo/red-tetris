import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Room {
  roomName: string
  userName: string
}

const initialState: Room = {
  roomName: '',
  userName: ''
}

const RoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoomName(state, action: PayloadAction<{ roomName: string }>) {
      const { roomName } = action.payload
      state.roomName = roomName
    },
    updateUsereName(state, action: PayloadAction<{ userName: string }>) {
      const { userName } = action.payload
      state.userName = userName
    }
  }
})

export const { updateRoomName, updateUsereName } = RoomSlice.actions

export default RoomSlice.reducer
