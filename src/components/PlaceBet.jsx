
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { adjustOddsForFriend } from '../OddsUtils';
import { placeBet, setEvents } from '../redux/userSlice'; // Assume setEvents is for fetching events

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background-color: #121212; /* Dark mode background */
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3); /* Slight border for depth */
`;

const BettersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
`;

const BetterCard = styled.div`
  background-color: #232323; /* Slightly lighter than the form background for contrast */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #E0E0E0; /* Light grey for titles */
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
`;

const Label = styled.span`
  font-size: 0.9rem;
  color: #BDBDBD; /* Soft white for labels */
`;

const Value = styled.span`
  font-size: 1rem;
  color: #FFFFFF; /* Bright white for contrast and readability */
  font-weight: 600;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #333333; /* Dark background for dropdown */
  color: #fff; /* Text color */
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #333333;
  color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #0d47a1; /* Bright color for the button */
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1565c0; /* Slightly lighter on hover */
  }
`;
export function PlaceBet({ friend, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector(state => state.user.events); // Accessing events from the Redux store
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
      eventName: selectedEvent.name,
      userOdds: selectedEvent.odds,
      friendOdds: adjustOddsForFriend(selectedEvent.odds, parseFloat(betAmount)),
    };

    dispatch(placeBet(betDetails)); // Dispatch action to place a bet
    onClose(); // Close the modal
    navigate('/bet-confirmation', { state: { betDetails } }); // Navigate to the bet confirmation page
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Place Your Bet</Title>
        <Select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          required
        >
          <option value="">Select an event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>{event.name} - Odds: {event.odds}</option>
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
