import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IoSettingsSharp } from 'react-icons/io5';
import { useTheme } from './ThemeContext'; // Make sure to import the useTheme hook

const SettingsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  position: relative;
`;

const SettingIcon = styled.div`
  font-size: 24px;
  color: white;
  position: ; // Fixed position typo
  top: 0;
  right: 20px;
  cursor: pointer;
`;

const Modal = styled.div`
  background-color: #1f2937;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 12px;
  width: 400px; /* Increased width for better layout */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const SettingItem = styled.div`
  background-color: #282c34;
  color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #ef4444;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #dc2626;
  }
`;

const CloseButton = styled(Button)`
  background-color: #374151; /* Darker shade for close button */
  
  &:hover {
    background-color: #4B5563;
  }
`;

const Label = styled.span`
  font-size: 16px;
`;

export default function Settings() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { toggleTheme } = useTheme(); // Use the toggleTheme function from ThemeContext

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <SettingsContainer>
      <SettingIcon onClick={toggleModal}>
        <IoSettingsSharp />
      </SettingIcon>
      {isModalOpen && (
        <>
          <ModalOverlay onClick={toggleModal} />
          <Modal>
            <h2>Customization Options</h2>
            <SettingItem>
              <Label>Theme</Label>
              <Button onClick={toggleTheme}>Toggle Theme</Button> {/* Changed the onClick to toggleTheme */}
            </SettingItem>
            <SettingItem>
              <Label>Notifications</Label>
              <Button onClick={() => alert('Notification settings coming soon!')}>
                Settings
              </Button>
            </SettingItem>
            <SettingItem>
              <Label>Change Password</Label>
              <Button onClick={() => alert('Change password feature coming soon!')}>
                Change
              </Button>
            </SettingItem>
            <SettingItem>
              <Label>Log Out</Label>
              <Button onClick={() => alert('Logging out...')}>Log Out</Button>
            </SettingItem>
            <SettingItem>
              <CloseButton onClick={toggleModal}>Close</CloseButton>
            </SettingItem>
          </Modal>
        </>
      )}
    </SettingsContainer>
  );
}
