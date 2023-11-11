import { Room } from "@red-tetris/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Room[] = [];

const roomListSlice = createSlice({
  name: "roomList",
  initialState,
  reducers: {
    updateRoomList(state, action: PayloadAction<Room[]>) {
      return [...action.payload] // immutability is more recommanded.
    },
  },
});

export const {updateRoomList} = roomListSlice.actions;
export default roomListSlice.reducer;