import React from 'react';
import styled from '@emotion/styled';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  color: black;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  z-index: 1001;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4fd1c5;
  border: none;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: #38b2ac;
  }

  &:first-of-type {
    background-color: #ef4444;
    &:hover {
      background-color: #dc2626;
    }
  }
`;

export const Modal = ({ children, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleBoxClick = (e) => e.stopPropagation();

  return (
    <Backdrop onClick={handleBackdropClick}>
      <ModalBox onClick={handleBoxClick}>
        {children}
        <Actions>
          <Button onClick={onClose}>Cancel</Button>
          {onConfirm && <Button onClick={onConfirm}>Confirm</Button>}
        </Actions>
      </ModalBox>
    </Backdrop>
  );
};