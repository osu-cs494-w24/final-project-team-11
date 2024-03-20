import React, { createContext, useContext, useState, useEffect } from 'react';

const BettingContext = createContext();

export const useBetting = () => useContext(BettingContext);

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
  const [user, setUser] = useState({ name: 'John Doe', balance: 1000, email: 'john.doe@example.com' });
  const [bets, setBets] = useState([]);
  const [friends, setFriends] = useState([]);
  const [events, setEvents] = useState(dummyLiveOdds); // Use dummy data for events
  const [liveOdds, setLiveOdds] = useState([]);

  useEffect(() => {
    // Since we're using dummy data, there's no need to fetch data here
    // You can still use this hook for other initialization if needed
  }, []);

  const placeBet = (betDetails) => {
    setBets(prevBets => [...prevBets, betDetails]);
  };

  const addFriend = (friendDetails) => {
    setFriends(prevFriends => [...prevFriends, friendDetails]);
  };

  return (
    <BettingContext.Provider value={{ user, bets, friends, events, liveOdds, placeBet, addFriend }}>
      {children}
    </BettingContext.Provider>
  );
};





// const BettingContext = createContext();

// export const useBetting = () => useContext(BettingContext);

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



// const dummyLiveOdds = [
//   {
//     id: '1',
//     name: 'Event 1',
//     bookmakers: [
//       {
//         markets: [
//           {
//             key: 'h2h',
//             outcomes: [
//               {
//                 name: 'Team A',
//                 price: 1.5,
//               },
//               {
//                 name: 'Team B',
//                 price: 2.3,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Event 2',
//     bookmakers: [
//       {
//         markets: [
//           {
//             key: 'h2h',
//             outcomes: [
//               {
//                 name: 'Team C',
//                 price: 1.8,
//               },
//               {
//                 name: 'Team D',
//                 price: 2.1,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Event 3',
//     bookmakers: [
//       {
//         markets: [
//           {
//             key: 'totals',
//             outcomes: [
//               {
//                 name: 'Over 2.5',
//                 price: 1.9,
//               },
//               {
//                 name: 'Under 2.5',
//                 price: 1.95,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '4',
//     name: 'Event 4',
//     bookmakers: [
//       {
//         markets: [
//           {
//             key: 'spread',
//             outcomes: [
//               {
//                 name: 'Team E -1.5',
//                 price: 2.2,
//               },
//               {
//                 name: 'Team F +1.5',
//                 price: 1.7,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '5',
//     name: 'Event 5',
//     bookmakers: [
//       {
//         markets: [
//           {
//             key: 'h2h',
//             outcomes: [
//               {
//                 name: 'Team G',
//                 price: 2.0,
//               },
//               {
//                 name: 'Team H',
//                 price: 1.8,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '6',
//     name: 'Event 6',
//     bookmakers: [
//       {
//         markets: [
//           {
//             key: 'h2h',
//             outcomes: [
//               {
//                 name: 'Team I',
//                 price: 1.6,
//               },
//               {
//                 name: 'Team J',
//                 price: 2.4,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];




// export const BettingProvider = ({ children }) => {
//   const [user, setUser] = useState({ name: 'John Doe', balance: 1000, email: 'john.doe@example.com' });
//   const [bets, setBets] = useState([]);
//   const [friends, setFriends] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [liveOdds, setLiveOdds] = useState({});

//   const dispatch = useDispatch();

  

//   useEffect(() => {
   
//        setLiveOdds(dummyLiveOdds);
//     }, []);

 
//   const fetchEvents = async () => {
//     const apiKey = 'd09f331a139f9a05ca57d9935df6d9ef';
//     const url = `https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=${apiKey}&regions=us&markets=h2h,spreads`;
  
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error('Failed to fetch sports events');
//       const data = await response.json();
//       setEvents(data);
//     } catch (error) {
//       console.error('Error fetching sports events:', error);
//       throw error;
//     }
//   };

//   const placeBet = (betDetails) => {
//     setBets((prevBets) => [...prevBets, betDetails]);
//     dispatch(updateBalance(-betDetails.amount));
//   };

//   const addFriend = (friendDetails) => {
//     setFriends((prevFriends) => [...prevFriends, friendDetails]);
//   };

//   const updateLiveOdds = async (sportKey) => {
//     try {
//       const oddsData = await fetchLiveOdds(sportKey);
//       setLiveOdds((prevOdds) => ({
//         ...prevOdds,
//         [sportKey]: oddsData,
//       }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <BettingContext.Provider
//       value={{
//         user,
//         bets,
//         friends,
//         events,
//         liveOdds,
//         fetchLiveOdds,
//         placeBet,
//         addFriend,
//       }}
//     >
//       {children}
//     </BettingContext.Provider>
//   );
// };