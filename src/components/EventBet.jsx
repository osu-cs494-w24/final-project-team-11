
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useBetting } from './BettingContext';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseBalance } from '../redux/walletSlice';
import { placeBet } from '../redux/bettingHistorySlice';
import { Modal } from './Modal';
import { adjustOddsForFriend } from '../OddsUtils';
import BetterCard from './BetterCard';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background-color: #1c1c1c;
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
  background-color: #2d2d2d;
  color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #2d2d2d;
  color: #fff;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ffcc00;
  color: #1c1c1c;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bold;

  &:hover {
    background-color: #ffc200;
  }
`;

const OddsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  color: #fff;
`;

const OddsItem = styled.div`
  font-size: 18px;
`;

export function EventBet({ event, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { friends } = useBetting();
  const [selectedFriendId, setSelectedFriendId] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [adjustedOdds, setAdjustedOdds] = useState(null);

  const walletBalance = useSelector((state) => state.wallet.balance);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFriendId || !betAmount) {
      alert("Please select an event and enter an amount.");
      return;
    }

    /*const selectedFriend = friends.find((friend) => friend.id === selectedFriendId);
    if (!selectedFriend) {
      alert("Selected event not found.");
      return;
    } */

    const userOdds = event.bookmakers[0].markets.find(
      (market) => market.key === 'h2h'
    ).outcomes[0].price;

    const betAmountNumber = parseFloat(betAmount);

    const betDetails = {
      friendId: selectedFriendId,
      eventId: event.id,
      amount: betAmountNumber,
      eventName: event.home_team + 'vs' + event.away_team,
      userOdds,
      friendOdds: adjustOddsForFriend(userOdds, betAmountNumber, betAmountNumber),
    };

    if (betDetails.amount > walletBalance) {
      alert("Insufficient balance. Please reduce your bet amount.");
      return;
    }

    try {
      console.log("bet details: ", betDetails)
      dispatch(placeBet(betDetails));
      dispatch(decreaseBalance(betDetails.amount));
      onClose();
      navigate('/bet-confirmation', { state: { betDetails } });
    } catch (error) {
      console.error('Error placing bet:', error);
      alert('Failed to place bet. Please try again later.');
    }
  };

  const calculateAdjustedOdds = () => {
    if (!event.id || !betAmount) return null;

    //const event = events.find((event) => event.id === );
    const userOdds = event.bookmakers[0].markets.find(
      (market) => market.key === 'h2h'
    ).outcomes[0].price;

    const adjustedOdds = adjustOddsForFriend(
      userOdds,
      parseFloat(betAmount),
      parseFloat(betAmount)
    );

    return adjustedOdds;
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <FormContainer onSubmit={handleSubmit}>
        <BettersContainer>
          <BetterCard
            name="You"
            odds={
              //events.find((event) => event.id === selectedEventId)?.bookmakers?.[0]
                //?.markets?.find((market) => market.key === 'h2h')?.outcomes[0].price ||
              event?.bookmakers?.[0]?.markets?.find((market) => market.key === 'h2h')?.outcomes[0].price ||
              'Select an event'
            }
            amount={betAmount || '0'}
          />
          <BetterCard
            name='TBD'
            odds={adjustedOdds ? adjustedOdds.toString() : 'TBD'}
            amount={betAmount || '0'}
          />
        </BettersContainer>
        <OddsContainer>
          <OddsItem>Original Odds: {calculateAdjustedOdds() || 'Select an event'}</OddsItem>
          <OddsItem>
            Adjusted Odds: {adjustedOdds ? adjustedOdds.toString() : 'TBD'}
          </OddsItem>
        </OddsContainer>
        <Select
          value={selectedFriendId}
          onChange={(e) => {
            setSelectedFriendId(e.target.value);
            setAdjustedOdds(calculateAdjustedOdds());
          }}
          required
        >
          <option value="">Select a Friend</option>
          {friends.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          value={betAmount}
          onChange={(e) => {
            setBetAmount(e.target.value);
            setAdjustedOdds(calculateAdjustedOdds());
          }}
          placeholder="Bet Amount"
          min="1"
          required
        />
        <Button type="submit">Place Bet</Button>
      </FormContainer>
    </Modal>
  );
}
