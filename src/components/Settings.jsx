import React from 'react';
import styled from '@emotion/styled';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-height: 100vh; */
  background-color: #1c1c1c;
  color: white;
  padding: 20px;
`;

const SettingItem = styled.div`
  background-color: #2d2d2d;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  background-color: #ef4444;
  color: white;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dc2626;
  }
`;

export default function Settings() {
  const handleChangePassword = () => {
    // Implement change password logic
    alert('Change password feature coming soon!');
  };

  const handleLogout = () => {
    // Implement logout logic
    alert('Logging out...');
  };

  return (
    <SettingsContainer>
      <SettingItem>
        <Button onClick={handleChangePassword}>Change Password</Button>
      </SettingItem>
      <SettingItem>
        <Button onClick={handleLogout}>Log Out</Button>
      </SettingItem>
    </SettingsContainer>
  );
}