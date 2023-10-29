import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Join {
  roomName: string
  userName: string
}

const initialState: Join = {
  roomName: '',
  userName: ''
}

const joinSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    updateRoomName(state, action: PayloadAction<{ roomName: string }>) {
      const { roomName } = action.payload
      state.roomName = roomName
    },
    updateUserName(state, action: PayloadAction<{ userName: string }>) {
      const { userName } = action.payload
      state.userName = userName
    }
  }
})

export const { updateRoomName, updateUserName } = joinSlice.actions

export default joinSlice.reducer
