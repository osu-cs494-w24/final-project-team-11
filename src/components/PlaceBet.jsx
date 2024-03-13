import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useBetting } from './BettingContext';

import { Modal } from './Modal';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4fd1c5;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #38b2ac;
  }
`;

export function PlaceBet({ friend, onClose }) {
  const navigate = useNavigate();
  const { placeBet, events, loading } = useBetting(); // Using the custom hook
  const [selectedEventId, setSelectedEventId] = useState('');
  const [betAmount, setBetAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEventId || !betAmount) {
      alert("Please select an event and enter an amount.");
      return;
    }

    const selectedEvent = events.find(event => event.id === selectedEventId);
    if (!selectedEvent) {
      alert("Selected event not found.");
      return;
    }

    const betDetails = {
      friendId: friend.id,
      eventId: selectedEventId,
      amount: parseFloat(betAmount),
      eventName: selectedEvent.name, // Assuming your event object has a name property
    };

    placeBet(betDetails); // Assuming your context provides a placeBet function
    onClose(); // Close the modal
    navigate('/bet-confirmation', { state: { betDetails } }); // Navigate to the bet confirmation view
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <FormContainer onSubmit={handleSubmit}>
        <Select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          required
        >
          <option value="">Select an event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.name} - Odds: {event.odds}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Bet Amount"
          min="1"
          required
        />
        <Button type="submit">Place Bet</Button>
      </FormContainer>
    </Modal>
  );
}
