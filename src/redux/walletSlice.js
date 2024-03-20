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
  },
});

export const { decreaseBalance } = walletSlice.actions;
export default walletSlice.reducer;