// src/App.tsx

import React, { useState } from 'react';
import { Map, Seq } from 'immutable';

// Define a type for the state
type AppState = {
  text: string;
  result: string;
  calculatedResult: string;
  lazySeqText: string;
  lazySeqResult: string;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    text: '',
    result: '',
    calculatedResult: '',
    lazySeqText: '',
    lazySeqResult: ''
  });

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    // Create a new immutable Map
    const data = Map({
      text: newText
    });
    // Calculate the output (example: reverse the text)
    const newResult = data.get('text')?.split('').reverse().join('') || '';
    setState(prevState => ({
      ...prevState,
      text: newText,
      result: newResult
    }));
  };

  const handleButtonClick = () => {
    setState(prevState => ({
      ...prevState,
      calculatedResult: prevState.result
    }));
  };

  const handleLazySeqInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLazySeqText = e.target.value;
    setState(prevState => ({
      ...prevState,
      lazySeqText: newLazySeqText
    }));
  };

  const handleLazySeqClick = () => {
    // Example: using Lazy Seq to process text
    const seq = Seq(state.lazySeqText.split('')).map(c => c.toUpperCase());
    const lazySeqResult = seq.join('');
    setState(prevState => ({
      ...prevState,
      lazySeqResult
    }));
  };

  return (
    <div className="container">
      <div className="section">
        <h1>Immutable Text Reversal</h1>
        <div className="input-group">
          <label htmlFor="textInput">Enter Text:</label>
          <input
            id="textInput"
            type="text"
            value={state.text}
            onChange={handleTextInputChange}
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
      <div className="section">
        <h1>Lazy Seq Operation</h1>
        <div className="input-group">
          <label htmlFor="lazySeqInput">Enter Text for Lazy Seq:</label>
          <input
            id="lazySeqInput"
            type="text"
            value={state.lazySeqText}
            onChange={handleLazySeqInputChange}
          />
        </div>
        <button className="button" onClick={handleLazySeqClick}>
          Process Text
        </button>
        <div className="output">
          <strong>Lazy Seq Result:</strong> {state.lazySeqResult}
        </div>
      </div>
    </div>
  );
};

export default App;

