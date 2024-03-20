import React from 'react';
import styled from '@emotion/styled';

const SettingsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const SettingItem = styled.div`
  background-color: #282c34;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #ef4444;
  color: white;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #dc2626;
  }
`;

export default function Settings() {
  return (
    <SettingsContainer>
      <SettingItem>
        <Button onClick={() => alert('Change password feature coming soon!')}>
          Change Password
        </Button>
      </SettingItem>
      <SettingItem>
        <Button onClick={() => alert('Logging out...')}>Log Out</Button>
      </SettingItem>
    </SettingsContainer>
  );
}
