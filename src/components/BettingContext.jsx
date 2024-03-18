import React, { createContext, useContext, useState, useEffect } from 'react';

const BettingContext = createContext();

export const useBetting = () => useContext(BettingContext);

// Example placeholder for fetching live odds
const fetchLiveOdds = async (sportKey) => {
  // Placeholder: Replace with actual API call logic
};

// Example function for fetching events from the Odds API
const fetchEvents = async () => {
  const apiKey = 'd09f331a139f9a05ca57d9935df6d9ef'; // Replace with your actual API key
  const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch sports events');
    const data = await response.json();
    return data; // Returns an array of sports events
  } catch (error) {
    console.error('Error fetching sports events:', error);
    throw error;
  }
};

export const BettingProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'John Doe', balance: 1000, email: 'john.doe@example.com' }); // Mock user data
  const [bets, setBets] = useState([]); // State for bets
  const [friends, setFriends] = useState([]); // State for friends
  const [events, setEvents] = useState([]); // State for events
  const [liveOdds, setLiveOdds] = useState([]); // State for live odds

  useEffect(() => {
    const initializeData = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        // You can also fetch and set friends and bets here if you have respective APIs or logic
      } catch (error) {
        console.error(error);
      }
    };

    initializeData();
  }, []);

  const placeBet = (betDetails) => {
    // Logic to place a bet
    setBets(prevBets => [...prevBets, betDetails]);
  };

  // Function to simulate adding a friend, replace with actual logic as needed
  const addFriend = (friendDetails) => {
    setFriends(prevFriends => [...prevFriends, friendDetails]);
  };

  return (
    <BettingContext.Provider value={{ user, bets, friends, events, liveOdds, placeBet, addFriend }}>
      {children}
    </BettingContext.Provider>
  );
};
