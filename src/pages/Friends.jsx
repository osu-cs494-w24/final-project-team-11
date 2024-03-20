import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import friendsList from '../data/friendsData';
import BetsList from '../components/BetsList';
import { PlaceBet } from '../components/PlaceBet';
import { Modal } from '../components/Modal';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FriendsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const FriendCard = styled.li`
  background-color: #2d2f34;
  color: white;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #e2e8f0;
`;

const Username = styled.span`
  font-size: 16px;
  color: #a0aec0;
`;

const OnlineStatus = styled.span`
  color: ${(props) => (props.status === 'Online' ? 'limegreen' : 'red')};
  font-weight: bold;
`;

const BettingHistory = styled.span`
  font-size: 14px;
  color: #cbd5e1;
`;

const BetButton = styled.button`
  background-color: #4fd1c5;
  color: #2d3748;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #38b2ac;
  }
`;

export function Friends() {
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { fetchLiveOdds } = useBetting();

  const handleBetButtonClick = async (friend) => {
    await fetchLiveOdds();
    setSelectedFriend(friend);
    setIsBetModalOpen(true);
  };

  return (
    <PageContainer>
      <FriendsList>
        {friendsList.map((friend) => (
          <FriendCard key={friend.id}>
            <Column>
              <Name>{friend.name}</Name>
              <Username>@{friend.username}</Username>
            </Column>
            <Column>
              <OnlineStatus status={friend.status}>{friend.status}</OnlineStatus>
            </Column>
            <Column>
              <BettingHistory>
                {friend.bettingHistory[0].match} - ${friend.bettingHistory[0].amount} - {friend.bettingHistory[0].result}
              </BettingHistory>
            </Column>
            <Column>
              <BetButton onClick={() => handleBetButtonClick(friend)}>Bet with {friend.name.split(' ')[0]}</BetButton>
            </Column>
          </FriendCard>
        ))}
      </FriendsList>
      <BetsList />
      <main>
        <Outlet />
      </main>
      <Modal isOpen={isBetModalOpen} onClose={() => setIsBetModalOpen(false)}>
        <PlaceBet friend={selectedFriend} onClose={() => setIsBetModalOpen(false)} />
      </Modal>
    </PageContainer>
  );
}