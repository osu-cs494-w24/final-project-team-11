import React, { createContext, useContext, useState, useEffect } from 'react';
import friendsList from '../friends_page/data/friendsData';

const BettingContext = createContext();

export const useBetting = () => useContext(BettingContext);

// Example placeholder for fetching live odds
const fetchLiveOdds = async (sportKey) => {
  // Placeholder: Replace with actual API call logic
};

// Example function for fetching events from the Odds API
const fetchEvents = async () => {
  const apiKey = 'cdd89b0791b1ba305b84ee2ec4b31d8b'; // Replace with your actual API key
  //const url = `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`;
  const url = ' https://api.the-odds-api.com/v4/sports/basketball_ncaab/odds/?apiKey=cdd89b0791b1ba305b84ee2ec4b31d8b&regions=us&markets=h2h,spreads&oddsFormat=american'

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
        console.log("Betting Context == eventsData:  ", eventsData)
        // You can also fetch and set friends and bets here if you have respective APIs or logic
      } catch (error) {
        console.error(error);
      }
    };
    setFriends(friendsList)

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
