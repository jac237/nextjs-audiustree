import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTrack: {},
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
  },
});

export const { setCurrentTrack } = playerSlice.actions;

export const selectCurrentTrack = (state) => state.player.currentTrack;

export default playerSlice.reducer;
