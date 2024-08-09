// src/App.tsx

import React, { useState } from 'react';
import { Map } from 'immutable';

// Define a type for the state
type AppState = {
  text: string;
  result: string;
  calculatedResult: string;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    text: '',
    result: '',
    calculatedResult: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    // Create a new immutable Map
    const data = Map({
      text: newText
    });
    // Calculate the output (example: reverse the text)
    const newResult = data.get('text')?.split('').reverse().join('') || '';
    setState({
      text: newText,
      result: newResult,
      calculatedResult: state.calculatedResult // Keep the previous calculated result
    });
  };

  const handleButtonClick = () => {
    setState(prevState => ({
      ...prevState,
      calculatedResult: prevState.result // Show the result when the button is clicked
    }));
  };

  return (
    <div className="container">
      <h1>Immutable Text Reversal</h1>
      <div className="input-group">
        <label htmlFor="textInput">Enter Text</label>
        <input
          id="textInput"
          type="text"
          value={state.text}
          onChange={handleInputChange}
        />
      </div>
      <button className="button" onClick={handleButtonClick}>
        Show Result
      </button>
      <div className="output">
        <strong>Live Output:</strong> {state.result}
      </div>
      <div className="output">
        <strong>Calculated Result:</strong> {state.calculatedResult}
      </div>
    </div>
  );
};

export default App;

