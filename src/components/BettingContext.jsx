import React, { createContext, useContext, useState, useEffect } from 'react';
import friendsList from '../friends_page/data/friendsData';
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
    name: 'Montana St. vs. Grambling St.',
    bookmakers: [
      {
        markets: [
          {
            key: 'h2h',
            outcomes: [
              {
                name: 'Montana St.',
                price: -120,
              },
              {
                name: 'Grambling St',
                price: 135,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Oregon St. vs. Eastern Washington',
    bookmakers: [
      {
        markets: [
          {
            key: 'h2h',
            outcomes: [
              {
                name: 'Oregon St.',
                price: -150,
              },
              {
                name: 'Eastern Washington',
                price: 510,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'North Carolina vs. Wagner',
    bookmakers: [
      {
        markets: [
          {
            key: 'h2h',
            outcomes: [
              {
                name: 'North Carolina',
                price: -120,
              },
              {
                name: 'Wagner',
                price: 610,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Texas vs. Colorado St.',
    bookmakers: [
      {
        markets: [
          {
            key: 'h2h',
            outcomes: [
              {
                name: 'Texas',
                price: -150,
              },
              {
                name: 'Colorado St.',
                price: 350,
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
    name: 'Quinnipiac vs. Wisconsin',
    bookmakers: [
      {
        markets: [
          {
            key: 'h2h',
            outcomes: [
              {
                name: 'Quinnipiac',
                price: 240,
              },
              {
                name: 'Wisconsin',
                price: -140,
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

  useEffect(() => {
    setFriends(friendsList) 
  });

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
