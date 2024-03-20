import React from 'react';
import styled from '@emotion/styled';
import myProfilePic from '../../public/assets/BetClashLogo.jpg'; // Adjust the path based on your structure


const UserInfoContainer = styled.div`
  background: #222831;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direcition: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 4px solid #00adb5; /* Accent color */
`;

const UserName = styled.h2`
  color: #eeeeee;
  margin: 10px 0 5px 0;
`;

const UserEmail = styled.p`
  color: #aaaaaa;
  font-size: 0.9rem;
`;

const UserStatus = styled.span`
  background-color: #00adb5;
  color: #222831;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.8rem;
`;

export default function UserInformation({ user }) {
    return (
      <UserInfoContainer>
        <ProfilePic src={user.profilePic || myProfilePic} alt="Profile" />
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        {/* Additional elements... */}
      </UserInfoContainer>
    );
  }
