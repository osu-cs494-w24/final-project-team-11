import React from 'react';
import styled from '@emotion/styled';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #282c34;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  float: right;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const SettingSection = styled.div`
  margin-bottom: 20px;
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

export default function SettingsModal({ onClose, onThemeChange }) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Customization Options</h2>
        <SettingSection>
          <Button onClick={onThemeChange}>Toggle Theme</Button>
        </SettingSection>
      </ModalContent>
    </ModalBackdrop>
  );
}