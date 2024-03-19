// src/components/BetsList.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

const Container = styled.div`/* CSS omitted for brevity */`;
const BetCard = styled.div`/* CSS omitted for brevity */`;

const BetsList = () => {
    const bets = useSelector((state) => state.user.bets);

    if (!bets || bets.length === 0) {
        return <Container>No bets placed yet.</Container>;
    }

    return (
        <Container>
            {bets.map((bet, index) => (
                <BetCard key={index}>
                    <p>Bet #{index + 1}</p>
                    <p>Event: {bet.eventName}</p>
                    <p>Amount: ${bet.amount.toFixed(2)}</p>
                </BetCard>
            ))}
        </Container>
    );
};

export default BetsList;
