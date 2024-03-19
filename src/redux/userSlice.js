import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const response = await axios.get('/path/to/user/data/endpoint');
    return response.data;
  }
);

// Asynchronous thunk for fetching events data
export const fetchEventsData = createAsyncThunk(
  'user/fetchEventsData',
  async () => {
    const response = await axios.get('/path/to/events/data/endpoint');
    return response.data;
  }
);

const initialState = {
  user: null,
  bets: [],
  events: [],
  friends: [],
  liveOdds: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Synchronous reducers remain unchanged
    setBets: (state, action) => {
      state.bets = action.payload;
    },
    addBet: (state, action) => {
      state.bets.push(action.payload);
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    setLiveOdds: (state, action) => {
      state.liveOdds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchEventsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsData.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEventsData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setBets, addBet, addFriend, setLiveOdds } = userSlice.actions;

export default userSlice.reducer;
