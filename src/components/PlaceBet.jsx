import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useBetting } from './BettingContext';
import { Modal } from './Modal';
import { adjustOddsForFriend } from '../OddsUtils';
import BetterCard from './BetterCard'; // Importing BetterCard component

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const BettersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #333333;
  color: #fff;
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
  background-color: #0d47a1;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1565c0;
  }
`;

export function PlaceBet({ friend, onClose }) {
  const navigate = useNavigate();
  const { placeBet, events } = useBetting();
  const [selectedEventId, setSelectedEventId] = useState('');
  const [betAmount, setBetAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEventId || !betAmount) {
      alert('Please select an event and enter an amount.');
      return;
    }

    const selectedEvent = events.find((event) => event.id === selectedEventId);
    if (!selectedEvent) {
      alert('Selected event not found.');
      return;
    }

    const eventOdds = selectedEvent.bookmakers?.[0]?.markets?.find((market) => market.key === 'h2h');
    if (!eventOdds) {
      alert('Live odds not available for the selected event.');
      return;
    }
    const userOdds = eventOdds.outcomes[0].price;
    const friendOdds = adjustOddsForFriend(userOdds, parseFloat(betAmount), parseFloat(betAmount));

    const betDetails = {
      friendId: friend.id,
      eventId: selectedEventId,
      amount: parseFloat(betAmount),
      eventName: selectedEvent.name,
      userOdds: userOdds,
      friendOdds: friendOdds,
    };

    placeBet(betDetails);
    onClose();
    navigate('/bet-confirmation', { state: { betDetails } });
  };

  // Using BetterCard for displaying the bet information
  return (
    <Modal isOpen={true} onClose={onClose}>
      <FormContainer onSubmit={handleSubmit}>
        <BettersContainer>
          <BetterCard
            name="You"
            odds={events.find((event) => event.id === selectedEventId)?.bookmakers?.[0]?.markets?.find(
              (market) => market.key === 'h2h'
            )?.outcomes[0].price || 'Select an event'}
            amount={betAmount || '0'}
          />
          <BetterCard
            name={friend.name}
            odds={selectedEventId
              ? adjustOddsForFriend(
                  events.find((event) => event.id === selectedEventId)?.bookmakers?.[0]?.markets?.find(
                    (market) => market.key === 'h2h'
                  )?.outcomes[0].price,
                  parseFloat(betAmount),
                  parseFloat(betAmount)
                ).toString()
              : 'TBD'}
            amount={betAmount || '0'}
          />
        </BettersContainer>
        <Select
  value={selectedEventId}
  onChange={(e) => setSelectedEventId(e.target.value)}
  required
>
  <option value="">Select an event</option>
  {events.map((event) => {
    // Assuming each event's ID is unique
    const oddsText = event.bookmakers[0].markets
      .find((market) => market.key === 'h2h')
      ?.outcomes.map((outcome, index) => `${outcome.name}: ${outcome.price}`)
      .join(', ');

    return (
      <option key={event.id} value={event.id}>
        {event.name} - Odds: {oddsText || 'N/A'}
      </option>
    );
  })}
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
