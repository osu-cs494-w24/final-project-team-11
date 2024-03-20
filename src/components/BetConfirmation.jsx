import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h2`
  color: #4CAF50;
`;

const Details = styled.p`
  color: #333;
`;

export function BetConfirmation() {
  const { state } = useLocation();
  const { betDetails } = state;

  return (
    <Container>
      <Heading>Bet Placed Successfully!</Heading>
      <Details>Event: {betDetails.eventName}</Details>
      <Details>Bet Amount: ${betDetails.amount}</Details>
      <Details>Your Adjusted Odds: {betDetails.userOdds}</Details>
      <Details>Friend's Adjusted Odds: {betDetails.friendOdds}</Details>
    </Container>
  );
}