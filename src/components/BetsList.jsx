import React, { useEffect, useState } from 'react';
import { useBetting } from './BettingContext'; // Ensure this path is correct
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px;
`;

const BetCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: #282c34;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
`;

const LoadingMessage = styled.p`
  color: #ffffff;
  text-align: center;
`;

const BetsList = () => {
    const { bets, loading, error } = useBetting();

    // Assuming `useBetting` hook is already fetching and updating the bets data
    // so no need to fetch bet details again here. Just display them.

    if (loading) {
        return <Container><LoadingMessage>Loading bets...</LoadingMessage></Container>;
    }

    if (error) {
        return <Container><ErrorMessage>{error}</ErrorMessage></Container>;
    }

    if (bets.length === 0) {
        return <Container>No bets placed yet.</Container>;
    }

    return (
        <Container>
            {bets.map((bet, index) => (
                <BetCard key={index}>
                    <p>Bet #{index + 1}</p>
                    <p>Event: {bet.eventName}</p>
                    <p>Amount: ${bet.amount.toFixed(2)}</p>
                    {/* Additional details can be displayed here as needed */}
                </BetCard>
            ))}
        </Container>
    );
};

export default BetsList;
