import { createSlice } from '@reduxjs/toolkit';

const bettingHistorySlice = createSlice({
  name: 'bettingHistory',
  initialState: [],
  reducers: {
    addBet: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addBet } = bettingHistorySlice.actions;

export default bettingHistorySlice.reducer;