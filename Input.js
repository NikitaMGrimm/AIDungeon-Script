const modifier = (input) => {
    // Skill System and Dice Roll Input Processing
    let modifiedInput = input;
    if (state.setup === undefined) {
        state.setup = true; // Only run it once
        // Stuff you only want to do once.
        state.lastRollWasCriticalSuccess = false;
        state.rollAdvantage = false;
        state.rollBias = 0;
        state.difficultyBias = -3;
        state.hideRoll = false;
    }

    state.memory.frontMemory = "";

    const lowerInput = input.toLowerCase();
    // Check for commands:
    if (lowerInput.includes("/help")) {
        //displayHelp();
        state.useCustomResponse = true;
        state.customResponse = displayHelp();
    }

    let max_roll = 20;
    let playerRoll = clamp(rollDice(max_roll) + state.rollBias, 1, max_roll);
    let checkRoll = clamp(rollDifficulty(max_roll) + state.difficultyBias, 1, max_roll);

    let result = '[' + playerRoll + '>=' + checkRoll + ': ';
    let failText = "Unlucky Roll]";
    let successText = "Lucky Roll]";

    let failActionMemorySentences = [
        "The action will be done clumsily and slow",
        "The action has a slightly unfortunate result",
        "The action is embarassing/unskilled/clumsy",
        "The action fails miserably"];
    let failActionMemoryWeights = [30, 75, 20, 5];
    let failActionMemory = "[PLAYER ACTION FAIL]\n" + "[" + weightedRandom(failActionMemorySentences, failActionMemoryWeights) + "]";

    let successActionMemorySentences = [
        "You put increased effort into the action",
        "The action has a higher chance of success",
        "The action will be done with experience/professionalism",
        "Unexpected divine success! EXTREMELY beneficial result."];
    let successActionMemoryWeights = [30, 70, 20, 10];
    let successActionMemory = "[PLAYER ACTION SUCCESS]\n" + "[" + weightedRandom(successActionMemorySentences, successActionMemoryWeights) + "]";

    if (state.lastRollWasCriticalSuccess == true) {
        state.lastRollWasCriticalSuccess = false;
        result = "[Lucky Roll]"
    } else if (playerRoll === 20) {
        state.lastRollWasCriticalSuccess = true;
        result += successText;
        state.memory.frontMemory += successActionMemory;
    } else if (checkRoll > playerRoll) {
        result += failText;
        state.memory.frontMemory += failActionMemory;
    } else {
        result += successText;
        state.memory.frontMemory += successActionMemory;
    }

    if (state.hideRoll == false) {
        modifiedInput += "\n" + result
    }

    return { text: modifiedInput };
}

// Don't modify this part
modifier(text);
