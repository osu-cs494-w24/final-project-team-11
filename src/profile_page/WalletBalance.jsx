import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const BalanceContainer = styled.div`
  margin-top: 20px;
  background-color: #2d2d2d;
  color: white;
  padding: 20px;
  border-radius: 8px;
`;

const BalanceTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const BalanceAmount = styled.p`
  font-size: 2rem;
  margin: 0;
`;

export default function WalletBalance() {
  const balance = useSelector((state) => state.wallet.balance);

  return (
    <BalanceContainer>
      <BalanceTitle>Wallet Balance</BalanceTitle>
      <BalanceAmount>${balance.toFixed(2)}</BalanceAmount>
    </BalanceContainer>
  );
}