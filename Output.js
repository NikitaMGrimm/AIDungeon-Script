const modifier = ({ text }) => {
    if (state.useCustomResponse) {
      state.useCustomResponse = false;
      state.customResponse = "";
      const response = state.customResponse;
      return { text: response };
    }
    return { text }; // Proceed with the AI's original response
};

// Don't modify this part
modifier(text)
