import React from 'react';
import styled from '@emotion/styled';

const BalanceContainer = styled.div`
  margin-top: 20px;
  background-color: #282c34;
  color: white;
  padding: 10px;
  border-radius: 8px;
`;

const BalanceTitle = styled.h3`
  margin: 0;
`;

const BalanceAmount = styled.p`
  font-size: 1.5rem;
  margin: 5px 0;
`;

export default function WalletBalance({ balance }) {
  return (
    <BalanceContainer>
      <BalanceTitle>Wallet Balance</BalanceTitle>
      <BalanceAmount>${balance.toFixed(2)}</BalanceAmount>
    </BalanceContainer>
  );
}
