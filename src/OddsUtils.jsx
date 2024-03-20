export const adjustOddsForFriend = (originalOdds, userAmount, friendAmount) => {
  const userAmountNumber = parseFloat(userAmount) || 1;
  const friendAmountNumber = parseFloat(friendAmount) || 1;

  let adjustedOdds = originalOdds * (userAmountNumber / friendAmountNumber);
  adjustedOdds = ensureOddsAreWithinBounds(adjustedOdds);

  return adjustedOdds.toFixed(2);
};

const ensureOddsAreWithinBounds = (odds) => {
  const minOdds = 1.01;
  const maxOdds = 10.0;

  if (odds < minOdds) return minOdds;
  if (odds > maxOdds) return maxOdds;
  return odds;
};

export const decimalToAmerican = (decimalOdds) => {
  if (decimalOdds >= 2) {
    return Math.round((decimalOdds - 1) * 100);
  } else {
    return Math.round(-100 / (decimalOdds - 1));
  }
};

export const americanToDecimal = (americanOdds) => {
  if (americanOdds > 0) {
    return (americanOdds / 100) + 1;
  } else {
    return (100 / Math.abs(americanOdds)) + 1;
  }
};