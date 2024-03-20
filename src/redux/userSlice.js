import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'John Doe',
    balance: 1000,
    email: 'john.doe@example.com',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.user.balance += action.payload;
    },
    placeBet: (state, action) => {
      // Assuming the bet amount is deducted from the user's balance
      const betAmount = action.payload.amount;
      if(state.user.balance >= betAmount) {
        state.user.balance -= betAmount;
      } else {
        console.error("Insufficient balance");
      }
    },
  },
});

export const { updateBalance, placeBet } = userSlice.actions;

export default userSlice.reducer;