const modifier = (input) => {
    // Skill System and Dice Roll Input Processing
    let modifiedInput = input;
    if (state.setup === undefined) {
        state.setup = true; // Only run it once
        // Stuff you only want to do once.
        state.criticalSuccess = false;
        state.rollAdvantage = true;
    }

    state.memory.frontMemory = "";

    const lowerInput = input.toLowerCase();
    // Check for commands:
    if (lowerInput.includes("/help")) {
        //displayHelp();
        state.useCustomResponse = true;
        state.customResponse = "TEST: displayHelp()";
    }

    let playerRoll = rollDice();
    let checkRoll = rollDifficulty();

    let failText = "Action Failed!]\n";
    let critSuccess = "Critical Success!]\n";
    let successText = "Action Success!]\n";

    let result = ' [' + playerRoll + '>=' + checkRoll + ': ';
    let succeedActionMemory = "\n[PLAYER ACTION SUCCEEDS]";
    let failActionMemory = "\n[PLAYER ACTION FAILS]";

    if (state.criticalSuccess == true) {
        state.criticalSuccess = false;
        result = "[Action Success!]"
    } else if (playerRoll === 20) {
        state.criticalSuccess = true;
        result += critSuccess;
        state.memory.frontMemory += succeedActionMemory;
    } else if (checkRoll > playerRoll) {
        result += failText;
        state.memory.frontMemory += failActionMemory;
    } else {
        result += successText;
        state.memory.frontMemory += succeedActionMemory;
    }

    // Add to the original input
    modifiedInput += '\n' + result;

    return { text: modifiedInput };
}

// Don't modify this part
modifier(text);

