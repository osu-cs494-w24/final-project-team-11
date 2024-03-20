import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 95%;
  background-color: #1c1c1c;
  color: white;
`;

const HistoryTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const BetItem = styled.div`
  background-color: #2d2d2d;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BetDetail = styled.p`
  margin: 5px 0;
  color: #e0e0e0;
  font-size: 18px;
`;

export default function BettingHistory() {
  const bets = useSelector((state) => state.bettingHistory);

  if (!bets || bets.length === 0) {
    return (
      <HistoryContainer>
        <HistoryTitle>No Betting History</HistoryTitle>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <HistoryTitle>Betting History</HistoryTitle>
      {bets.map((bet, index) => (
        <BetItem key={index}>
          <BetDetail>Event: {bet.eventName}</BetDetail>
          <BetDetail>Amount Bet: ${bet.amount.toFixed(2)}</BetDetail>
          <BetDetail>Your Odds: {bet.userOdds}</BetDetail>
          <BetDetail>Friend's Odds: {bet.friendOdds}</BetDetail>
          {bet.result && <BetDetail>Result: {bet.result}</BetDetail>}
          {bet.winnings && <BetDetail>Winnings: ${bet.winnings.toFixed(2)}</BetDetail>}
        </BetItem>
      ))}
    </HistoryContainer>
  );
}