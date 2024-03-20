import React from 'react';
import styled from '@emotion/styled';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NameText = styled.h2`
  font-size: 20px;
  margin: 5px 0;
`;

const OddsText = styled.p`
  font-size: 16px;
  margin: 5px 0;
  color: #666;
`;

const AmountText = styled.p`
  font-size: 16px;
  margin: 5px 0;
  color: #666;
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