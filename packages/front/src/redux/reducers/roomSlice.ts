import { Player, Room, RoomStatus } from "@red-tetris/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Room = {
  name: "",
  status: RoomStatus.WAITING,
  players: [] as Player[],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    updateRoom(state: Room, action: PayloadAction<Room>) {
      return { ...action.payload };
    },
    updatePlayers(state: Room, action: PayloadAction<Player[]>) {
      return { ...state, players: action.payload };
    },
    updateStatus(state: Room, action: PayloadAction<RoomStatus>) {
      return { ...state, status: action.payload };
    },
    updateName(state: Room, action: PayloadAction<string>) {
      return { ...state, name: action.payload };
    },
  },
});

export const { updateRoom, updatePlayers, updateStatus, updateName } = roomSlice.actions;
export default roomSlice.reducer;