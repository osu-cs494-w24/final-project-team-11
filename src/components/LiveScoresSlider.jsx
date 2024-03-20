// import React, { useEffect, useState } from 'react';
// import styled from '@emotion/styled';
// import { useQuery } from '@tanstack/react-query';

// const LiveScoresContainer = styled.div`
//   position: fixed;
//   top: 80px;
//   left: 0;
//   right: 0;
//   height: 40px;
//   background-color: #333;
//   color: #fff;
//   display: flex;
//   align-items: center;
//   overflow: hidden;
//   padding: 0 20px;
// `;

// const LiveScoreItem = styled.div`
//   white-space: nowrap;
//   padding: 0 20px;
//   font-size: 16px;
//   animation: slide 30s linear infinite;

//   @keyframes slide {
//     0% {
//       transform: translateX(100%);
//     }
//     100% {
//       transform: translateX(-100%);
//     }
//   }
// `;

// export default function LiveScoresSlider() {
//   const [liveScores, setLiveScores] = useState([]);

//   const { data, isLoading, error } = useQuery(['liveScores'], async () => {
//     try {
//       const response = await fetch(
//         'https://api.the-odds-api.com/v4/sports/soccer_epl/scores/?apiKey=d09f331a139f9a05ca57d9935df6d9ef&daysFrom=1'
//       );
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching live scores:', error);
//       throw new Error('Failed to fetch live scores');
//     }
//   });

//   useEffect(() => {
//     if (data) {
//       const scores = data
//         .filter((game) => !game.completed)
//         .map((game) => `${game.home_team} ${game.scores[0].score} - ${game.scores[1].score} ${game.away_team}`);
//       setLiveScores(scores);
//     }
//   }, [data]);

//   if (isLoading) {
//     return <LiveScoresContainer>Loading live scores...</LiveScoresContainer>;
//   }

//   if (error) {
//     return <LiveScoresContainer>Error loading live scores</LiveScoresContainer>;
//   }

//   return (
//     <LiveScoresContainer>
//       <LiveScoreItem>{liveScores.join(' | ')}</LiveScoreItem>
//     </LiveScoresContainer>
//   );
// }