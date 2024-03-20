import { createSlice } from '@reduxjs/toolkit';

const bettingHistorySlice = createSlice({
  name: 'bettingHistory',
  initialState: [],
  reducers: {
    placeBet: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { placeBet } = bettingHistorySlice.actions;

export default bettingHistorySlice.reducer;