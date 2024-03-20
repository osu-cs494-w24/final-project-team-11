import React from 'react';
import styled from '@emotion/styled';
import { useBetting } from './BettingContext';

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const HistoryTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const BetItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BetDetail = styled.p`
  margin: 5px 0;
  color: #666;
`;

export default function BettingHistory() {
  const { bets } = useBetting();

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