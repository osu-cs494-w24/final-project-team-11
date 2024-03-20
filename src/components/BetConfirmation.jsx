import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1c1c1c;
  color: white;
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4CAF50;
  text-align: center;
  text-transform: uppercase;
`;

const Details = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
  color: #e0e0e0;
  text-align: center;
`;

const ConfirmationBox = styled.div`
  background-color: #2d2d2d;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

export function BetConfirmation() {
  const { state } = useLocation();
  const { betDetails } = state;

  return (
    <Container>
      <ConfirmationBox>
        <Heading>Bet Placed Successfully!</Heading>
        <Details>Event: {betDetails.eventName}</Details>
        <Details>Bet Amount: ${betDetails.amount}</Details>
        <Details>Your Adjusted Odds: {betDetails.userOdds}</Details>
        <Details>Friend's Adjusted Odds: {betDetails.friendOdds}</Details>
      </ConfirmationBox>
    </Container>
  );
}