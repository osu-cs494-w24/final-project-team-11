import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    balance: 1000, // Set the initial balance
  },
  reducers: {
    decreaseBalance: (state, action) => {
      state.balance -= action.payload;
    },
    increaseBalance: (state, action) => {
      state.balance += action.payload;
    },
  },
});

export const { decreaseBalance, increaseBalance } = walletSlice.actions;
export default walletSlice.reducer;