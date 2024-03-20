import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { placeBet } from '../redux/bettingHistorySlice';
import { decreaseBalance } from '../redux/walletSlice';

const BettingContext = createContext();

export const useBetting = () => useContext(BettingContext);



// const fetchLiveOdds = async (sportKey) => {
//   const apiKey = 'd09f331a139f9a05ca57d9935df6d9ef';
//   const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?apiKey=${apiKey}&regions=us&markets=h2h,spreads&dateFormat=iso`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Failed to fetch live odds');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching live odds:', error);
//     throw error;
//   }
// };
const dummyLiveOdds = [
  {
    id: '1',
    name: 'Event 1',
    bookmakers: [
      {
        markets: [
          {
            key: 'h2h',
            outcomes: [
              {
                name: 'Team A',
                price: 1.5,
              },
              {
                name: 'Team B',
                price: 2.3,
              },
            ],
          },
        ],
      },
    ],
  },
  // Add the rest of the dummyLiveOdds data here as in your given structure
  {
    id: '6',
    name: 'Event 6',
    bookmakers: [
      {
        markets: [
          {
            key: 'h2h',
            outcomes: [
              {
                name: 'Team I',
                price: 1.6,
              },
              {
                name: 'Team J',
                price: 2.4,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const BettingProvider = ({ children }) => {
  const [bets, setBets] = useState([]);
  const [friends, setFriends] = useState([]);
  const [events, setEvents] = useState(dummyLiveOdds); // Use dummy data for events
  const [liveOdds, setLiveOdds] = useState([]);

  const dispatch = useDispatch();

  const placeBetAsync = async (betDetails) => {
    try {
      setBets((prevBets) => [...prevBets, betDetails]);
      dispatch(placeBet(betDetails));
      dispatch(decreaseBalance(betDetails.amount));
    } catch (error) {
      console.error('Error placing bet:', error);
      throw error;
    }
  };

  const addFriend = (friendDetails) => {
    setFriends((prevFriends) => [...prevFriends, friendDetails]);
  };

  return (
    <BettingContext.Provider
      value={{
        bets,
        friends,
        events,
        liveOdds,
        placeBetAsync,
        addFriend,
      }}
    >
      {children}
    </BettingContext.Provider>
  );
};