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
    updateRoomName(state, action: PayloadAction<string>) {
      state.roomName = action.payload
    },
    updateUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload
    }
  }
})

export const { updateRoomName, updateUserName } = joinSlice.actions

export default joinSlice.reducer
