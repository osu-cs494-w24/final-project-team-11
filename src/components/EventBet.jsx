import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useBetting } from './BettingContext';
import { Modal } from './Modal';
import { adjustOddsForFriend } from '../OddsUtil';

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

export function EventBet({ event, onClose }) {
  const navigate = useNavigate();
  const { placeBet, friends } = useBetting();

  const [selectedFriendId, setSelectedFriendId] = useState('');
  const [betAmount, setBetAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFriendId || !betAmount) {
      alert("Please select an event and enter an amount.");
      return;
    }

    console.log("selected friend id: ", selectedFriendId)
    console.log("friends: ", friends[7].id)
    

    const friendAmount = betAmount;

    const betDetails = {
      friendId: selectedFriendId,
      eventId: event.id,
      amount: parseFloat(betAmount),
      eventName: event.home_team,
      userOdds: event.bookmakers[0].markets[0].outcomes[0].price,
      friendOdds: adjustOddsForFriend(event.bookmakers[0].markets[0].outcomes[0].price, parseFloat(betAmount), friendAmount),

    };

    placeBet(betDetails);
    onClose();
    navigate('/bet-confirmation', { state: { betDetails } });
  };

  const selectedFriend = friends.find(friend => friend.id === selectedFriendId);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <FormContainer onSubmit={handleSubmit}>
        <BettersContainer>
          <BetterCard>
            <Title>You</Title>
            <Info>
              <Label>Your Odds:</Label>
              <Value>{event.bookmakers[0].markets[0].outcomes[0].price || 'Select an event'}</Value>
            </Info>
            <Info>
              <Label>Amount:</Label>
              <Value>${betAmount || '0'}</Value>
            </Info>
          </BetterCard>
          <BetterCard>
            <Title>{selectedFriend?.name}</Title>
            <Info>
              <Label>Friend's Odds:</Label>
              <Value>{event?.bookmakers[0].markets[0].outcomes[1].price || 'TBD'}</Value> {/* Adjust based on your logic */}
            </Info>
            <Info>
              <Label>Amount:</Label>
              <Value>${betAmount || '0'}</Value> {/* Mirror amount for simplicity; adjust as needed */}
            </Info>
          </BetterCard>
        </BettersContainer>
        <Select
          value={selectedFriendId}
          onChange={(e) => setSelectedFriendId(e.target.value)}
          required
        >
          <option value="">Select a friend</option>
          {friends.map(friend => (
  <option key={friend.id} value={friend.id}>
    {friend.name} 
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
