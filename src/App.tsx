// src/App.tsx

import React, { useState } from 'react';
import { Map } from 'immutable';

// Define a type for the state
type AppState = {
  text: string;
  result: string;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    text: '',
    result: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    // Create a new immutable Map
    const data = Map({
      text: newText
    });
    // Calculate the output (example: reverse the text)
    const newResult = data.get('text')?.split('').reverse().join('') || '';
    setState({
      text: newText,
      result: newResult
    });
  };

  return (
    <div className="container">
      <h1>Immutable Text Reversal</h1>
      <div className="input-group">
        <label htmlFor="textInput">Enter Text:</label>
        <input
          id="textInput"
          type="text"
          value={state.text}
          onChange={handleChange}
        />
      </div>
      <div className="output">
        <strong>Reversed Text:</strong> {state.result}
      </div>
    </div>
  );
};

export default App;

