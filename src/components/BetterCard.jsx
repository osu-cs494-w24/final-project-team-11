import React from 'react';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  background-color: #2d2d2d;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  font-family: 'Roboto', sans-serif; /* Default font for the card */
`;

const NameText = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-transform: uppercase;
  text-align: center;
  font-family: 'Montserrat', sans-serif; /* Specific font for headings */
`;

const OddsText = styled.p`
  font-size: 20px;
  margin-bottom: 5px;
  color: #e0e0e0;
  text-align: center;
`;

const AmountText = styled.p`
  font-size: 20px;
  color: #e0e0e0;
  text-align: center;
`;


const BetterCard = ({ name, odds, amount }) => {
  return (
    <CardContainer>
      <NameText>{name}</NameText>
      <OddsText>Odds: {odds}</OddsText>
      <AmountText>Amount: ${amount}</AmountText>
    </CardContainer>
  );
};

export default BetterCard;