import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice ({
    name: 'wallet',
    initialState: {
        balance: 1000,
    },

    reducers: {
        decreaseBalance(state, action) {
            state.balance -= action.payload;
        },
        //leave for depostiing and withdrawing
    }
});

export const { decreaseBalance } = walletSlice.actions;
export default walletSlice.reducer;