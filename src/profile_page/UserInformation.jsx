import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import myProfilePic from '../assets/myProfilePic.jpg';

const UserInfoContainer = styled.div`
  background: #2d2d2d;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: white;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 6px solid #00adb5; /* Accent color */
`;

const UserName = styled.h2`
  color: #eeeeee;
  margin: 10px 0;
  font-size: 24px;
  text-transform: uppercase;
`;

const UserEmail = styled.p`
  color: #aaaaaa;
  font-size: 18px;
`;

const UserStatus = styled.span`
  background-color: #00adb5;
  color: #222831;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 16px;
`;

export default function UserInformation() {
  const user = useSelector((state) => state.user.user);
  const balance = useSelector((state) => state.wallet.balance);

  return (
    <UserInfoContainer>
      <ProfilePic src={user.profilePic || myProfilePic} alt="Profile" />
      <UserName>{user.name}</UserName>
      <UserEmail>{user.email}</UserEmail>
      <UserStatus>Balance: ${balance ? balance.toFixed(2) : '0.00'}</UserStatus>
      {/* You can add more user information elements here */}
    </UserInfoContainer>
  );
}