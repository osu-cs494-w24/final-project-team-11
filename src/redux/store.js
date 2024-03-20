import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './walletSlice';
import bettingHistoryReducer from './bettingHistorySlice';

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    bettingHistory: bettingHistoryReducer,
  },
});

export default store;