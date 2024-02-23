const modifier = (input) => {
    // Skill System and Dice Roll Input Processing
    let modifiedInput = input;
    if (state.setup === undefined) {
        state.setup = true; // Only run it once
        // Stuff you only want to do once.
        state.lastRollWasCriticalSuccess = false;
        state.rollAdvantage = false;
        state.rollBias = 0;
        state.difficultyBias = 0;
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

    let playerRoll = rollDice() + state.rollBias;
    let checkRoll = rollDifficulty() + state.difficultyBias;

    let result = ' [' + playerRoll + '>=' + checkRoll + ': ';
    let failText = "Action Failed!]\n";
    let successText = "Action Success!]\n";

    let failActionMemorySentences = [
        "The action will be done clumsily and slow",
        "The action has a slightly unfortunate result",
        "The action fails slightly",
        "The action fails miserably"];
    let failActionMemoryWeights = [30, 75, 20, 5];
    let failActionMemory = "[PLAYER ACTION FAIL]\n" + "[" + weightedRandom(failActionMemorySentences, failActionMemoryWeights) + "]";

    let successActionMemorySentences = [
        "The action will be tried with increased effort",
        "The action has a higher chance of success",
        "The action will be done with experience/professionalism",
        "Unexpected divine success! EXTREMELY beneficial result."];
    let successActionMemoryWeights = [30, 70, 20, 10];
    let successActionMemory = "[PLAYER ACTION SUCCESS]\n" + "[" + weightedRandom(successActionMemorySentences, successActionMemoryWeights) + "]";

    if (state.lastRollWasCriticalSuccess == true) {
        state.lastRollWasCriticalSuccess = false;
        result = "[Action Success!]"
    } else if (playerRoll === 20) {
        state.lastRollWasCriticalSuccess = true;
        result += critSuccess;
        state.memory.frontMemory += successActionMemory;
    } else if (checkRoll > playerRoll) {
        result += failText;
        state.memory.frontMemory += failActionMemory;
    } else {
        result += successText;
        state.memory.frontMemory += successActionMemory;
    }

    return { text: modifiedInput };
}

// Don't modify this part
modifier(text);
