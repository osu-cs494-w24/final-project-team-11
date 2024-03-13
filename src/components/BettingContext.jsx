import React, { createContext, useContext, useState } from 'react';

const BettingContext = createContext();

export const useBetting = () => useContext(BettingContext);

// Simulated fetchEvents function
const fetchEvents = async () => {
  // Simulate a fetch delay and return dummy data
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: '1', name: 'Team A vs Team B', odds: '1.5' },
    { id: '2', name: 'Team C vs Team D', odds: '2.0' },
  ];
};

export const BettingProvider = ({ children }) => {
  const [bets, setBets] = useState([]);

  // Directly using useState for simplicity with dummy data
  const [events, setEvents] = useState([]);

  useState(() => {
    fetchEvents().then(data => setEvents(data));
  }, []);

  const placeBet = (bet) => {
    setBets(prevBets => [...prevBets, { ...bet, id: Date.now() }]);
  };

  return (
    <BettingContext.Provider value={{ bets, placeBet, events }}>
      {children}
    </BettingContext.Provider>
  );
};
