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
  },
});

export const { updateBalance } = userSlice.actions;

export default userSlice.reducer;