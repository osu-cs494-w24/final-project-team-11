import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './walletSlice';
import bettingHistoryReducer from './bettingHistorySlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    bettingHistory: bettingHistoryReducer,
    user: userReducer,
  },
});

export default store;