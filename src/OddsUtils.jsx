// oddsUtils.jsx

/**
 * Adjusts the odds for a friend's bet based on the user's wagered amount and the friend's estimated wager amount.
 * @param {number} originalOdds - The original odds of the event.
 * @param {number} userAmount - The amount wagered by the user.
 * @param {number} friendAmount - The estimated amount that the friend will wager.
 * @returns {string} - The adjusted odds for the friend's bet.
 */
export const adjustOddsForFriend = (originalOdds, userAmount, friendAmount) => {
    // Ensure the amounts are treated as numbers and prevent division by zero
    const userAmountNumber = parseFloat(userAmount) || 1;
    const friendAmountNumber = parseFloat(friendAmount) || 1;
  
    let adjustedOdds = originalOdds * (userAmountNumber / friendAmountNumber);
  
    // Apply any additional logic to ensure fairness or limit odds here
    adjustedOdds = ensureOddsAreWithinBounds(adjustedOdds);
  
    return adjustedOdds.toFixed(2); // Format to two decimal places
  };
  
  /**
   * Ensures that adjusted odds are within reasonable and fair bounds.
   * @param {number} odds - The calculated odds to be adjusted.
   * @returns {number} - The adjusted odds, ensuring they are within set bounds.
   */
  const ensureOddsAreWithinBounds = (odds) => {
    // Define minimum and maximum odds for fairness and to avoid extreme payouts
    const minOdds = 1.01; // Avoid odds too close to 1 (no risk)
    const maxOdds = 10.0; // Cap the odds to prevent extremely high payouts
  
    if (odds < minOdds) return minOdds;
    if (odds > maxOdds) return maxOdds;
    return odds;
  };
  
  /**
   * Converts decimal odds to American odds.
   * @param {number} decimalOdds - The decimal odds to be converted.
   * @returns {number} - The converted American odds.
   */
  export const decimalToAmerican = (decimalOdds) => {
    if (decimalOdds >= 2) {
      return Math.round((decimalOdds - 1) * 100);
    } else {
      return Math.round(-100 / (decimalOdds - 1));
    }
  };
  
  /**
   * Converts American odds to decimal odds.
   * @param {number} americanOdds - The American odds to be converted.
   * @returns {number} - The converted decimal odds.
   */
  export const americanToDecimal = (americanOdds) => {
    if (americanOdds > 0) {
      return (americanOdds / 100) + 1;
    } else {
      return (100 / Math.abs(americanOdds)) + 1;
    }
  };
  
  // Export additional utility functions as needed
  