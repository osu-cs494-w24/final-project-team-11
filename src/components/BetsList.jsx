import React from 'react';
import { useBetting } from './BettingContext';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-height: 100vh; */
  background-color: #1c1c1c;
  color: white;
  padding: 20px;
`;

const BetCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 10px 0;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #2d2d2d;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
  font-size: 20px;
`;

const LoadingMessage = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 20px;
`;

const NoBetsMessage = styled.p`
  color: #e0e0e0;
  text-align: center;
  font-size: 20px;
`;

const BetsList = () => {
  const { bets, loading, error } = useBetting();

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading bets...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (bets.length === 0) {
    return (
      <Container>
        <NoBetsMessage>No bets placed yet.</NoBetsMessage>
      </Container>
    );
  }

  return (
    <Container>
      {bets.map((bet, index) => (
        <BetCard key={index}>
          <p>Bet #{index + 1}</p>
          <p>Event: {bet.eventName}</p>
          <p>Amount: ${bet.amount.toFixed(2)}</p>
          <p>Your Odds: {bet.userOdds}</p>
          <p>Friend's Odds: {bet.friendOdds}</p>
        </BetCard>
      ))}
    </Container>
  );
};

export default BetsList;