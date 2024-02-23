// help function, state memory, etc...

// Dice Roll Function.
function rollDice() {
  if (state.rollAdvantage) {
    const roll1 = Math.floor(Math.random() * 20) + 1;
    const roll2 = Math.floor(Math.random() * 20) + 1;
    return Math.max(roll1, roll2);
  } else {
    return Math.floor(Math.random() * 20) + 1;
  }
}

// Roll Difficulty Function.
function rollDifficulty() {
  return Math.floor(Math.random() * 20) + 1;
}
