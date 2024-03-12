// src/pages/Friends.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import friendsList from '../friends_page/data/friendsData'; // Adjust the path as necessary

// Styled components
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
  max-width: 800px; // Adjusted for better layout
`;

const FriendCard = styled.li`
  background-color: #2d2f34; // Adjusted for a sleek look
  color: white;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-around; // Changed to space-around for even spacing
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
  color: #e2e8f0; // Lighter shade for better contrast
`;

const Username = styled.span`
  font-size: 16px;
  color: #a0aec0; // A different shade for the username
`;

const OnlineStatus = styled.span`
  color: ${props => props.status === 'Online' ? 'limegreen' : 'red'};
  font-weight: bold;
`;

const BettingHistory = styled.span`
  font-size: 14px;
  color: #cbd5e1; // Lighter shade for contrast
`;

const BetButton = styled.button`
  background-color: #4fd1c5; // Teal color for visibility
  color: #2d3748; // Dark gray for the text
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #38b2ac; // Darker teal on hover
  }
`;

export function Friends() {
    return (
        <PageContainer>
            <FriendsList>
                {friendsList.map(friend => (
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
                            <BetButton>Bet with {friend.name.split(' ')[0]}</BetButton>
                        </Column>
                    </FriendCard>
                ))}
            </FriendsList>
            <main><Outlet /></main>
        </PageContainer>
    );
}
