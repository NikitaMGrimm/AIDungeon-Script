// help function, state memory, etc...

// Dice Roll Function.
function rollDice(max_roll) {
  if (state.rollAdvantage) {
    const roll1 = Math.floor(Math.random() * max_roll) + 1;
    const roll2 = Math.floor(Math.random() * max_roll) + 1;
    return Math.max(roll1, roll2);
  } else {
    return Math.floor(Math.random() * max_roll) + 1;
  }
}

// Roll Difficulty Function.
function rollDifficulty(max_roll) {
  return Math.floor(Math.random() * max_roll) + 1;
}

function weightedRandom(items, weights) {
    let totalWeight = weights.reduce((prev, curr) => prev + curr, 0);
    let randomNum = Math.random() * totalWeight;
    let weightSum = 0;

    for (let i = 0; i < items.length; i++) {
        weightSum += weights[i];
        if (randomNum <= weightSum) {
            return items[i];
        }
    }
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function displayHelp() {
  return ''
}
