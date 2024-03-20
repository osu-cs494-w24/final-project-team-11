import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import UserInformation from '../profile_page/UserInformation';
import WalletBalance from '../profile_page/WalletBalance';
import BettingHistory from '../components/BettingHistory';
import Settings from '../components/Settings';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
  padding: 40px;
  background-color: #121212;
  color: #fff;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #1f1f1f;
  border-radius: 10px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.section`
  background: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export function Profile() {
  const user = useSelector((state) => state.user.user);
  const bets = useSelector((state) => state.bettingHistory);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <Sidebar>
        <UserInformation user={user} />
       
        <Settings />
      </Sidebar>
      <MainContent>
        <Section>
          <Title>Betting History</Title>
          <BettingHistory bets={bets} />
        </Section>
      </MainContent>
    </ProfileContainer>
  );
}