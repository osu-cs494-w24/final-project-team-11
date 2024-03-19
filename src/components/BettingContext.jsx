// BettingContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchEventsData, setUser } from '../redux/userSlice'; // Use fetchEventsData instead of setEvents

const BettingContext = createContext();

export const useBetting = () => useContext(BettingContext);

const oddsApi = axios.create({
  baseURL: 'https://api.the-odds-api.com/v4/sports',
  params: {
    apiKey: "d09f331a139f9a05ca57d9935df6d9ef",
  },
});

// Dummy function for fetching user data, replace with your actual data fetching logic
const fetchUserData = async () => {
  // Example: Return a promise that resolves with user data
  return Promise.resolve({ id: 1, name: "John Doe", balance: 1000 });
};


export const BettingProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the fetchEventsData thunk to fetch and set events data
    dispatch(fetchEventsData());

    // Fetch user data and dispatch setUser
    const initUserData = async () => {
      try {
        const userData = await fetchUserData(); // Make sure this is defined or imported
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    initUserData();
  }, [dispatch]);

  // The context value now simply facilitates interaction with the Betting context
  // It might include methods to interact with the betting data or trigger updates
  const contextValue = {};

  return (
    <BettingContext.Provider value={contextValue}>
      {children}
    </BettingContext.Provider>
  );
};
