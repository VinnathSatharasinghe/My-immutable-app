// src/App.tsx

import React, { useState } from 'react';
import { Map, Seq } from 'immutable';

// Define a type for the state
type AppState = {
  text: string;
  result: string;
  calculatedResult: string;
  lazySeqStart: number;
  lazySeqEnd: number;
  lazySeqResult: string;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    text: '',
    result: '',
    calculatedResult: '',
    lazySeqStart: 1,
    lazySeqEnd: 1000000,
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

  const handleLazySeqStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = parseInt(e.target.value, 10);
    setState(prevState => ({
      ...prevState,
      lazySeqStart: newStart
    }));
  };

  const handleLazySeqEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = parseInt(e.target.value, 10);
    setState(prevState => ({
      ...prevState,
      lazySeqEnd: newEnd
    }));
  };

  const handleLazySeqClick = () => {
    try {
      const { lazySeqStart, lazySeqEnd } = state;
      
      // Create a large collection of numbers within the specified range
      const largeCollection = Seq<number>(Array.from({ length: lazySeqEnd - lazySeqStart + 1 }, (_, i) => i + lazySeqStart));

      // Define a lazy sequence with transformations
      const lazySeq = largeCollection
        .filter(num => num % 2 === 0) // Filter even numbers
        .map(num => num * num) // Square the even numbers
        .reduce((sum, num) => sum + num, 0); // Calculate the sum of the squared numbers

      // Convert the lazy sequence to a value to trigger computation
      const resultValue = lazySeq;

      setState(prevState => ({
        ...prevState,
        lazySeqResult: `Sum of squares of even numbers from ${lazySeqStart} to ${lazySeqEnd}: ${resultValue}`
      }));
    } catch (error) {
      console.error("Error handling lazy sequence operation:", error);
      setState(prevState => ({
        ...prevState,
        lazySeqResult: 'An error occurred.'
      }));
    }
  };

  return (
    <div className="container">
      <div className="section">
        <h1>Immutable Text Reversal</h1>
        <p>
          This section allows you to input a string of text, which is then reversed. The reversed text is displayed in real-time as you type. 
          When you click the "Show Result" button, the reversed text is preserved and displayed as the calculated result. 
          This demonstrates how to use Immutable.js for simple data manipulations and state management, ensuring that the original data remains unchanged.
        </p>
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
        <p>
          This example demonstrates how to use Lazy Seq to efficiently process a large dataset. We start with a large list of numbers, 
          filter out the odd numbers, square the remaining even numbers, and then calculate the sum of these squared numbers. 
          The computation is deferred until necessary, which helps in handling large datasets efficiently.
        </p>
        <div className="input-group">
          <label htmlFor="lazySeqStart">Start of Range:</label>
          <input
            id="lazySeqStart"
            type="number"
            value={state.lazySeqStart}
            onChange={handleLazySeqStartChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="lazySeqEnd">End of Range:</label>
          <input
            id="lazySeqEnd"
            type="number"
            value={state.lazySeqEnd}
            onChange={handleLazySeqEndChange}
          />
        </div>
        <button className="button" onClick={handleLazySeqClick}>
          Process Range
        </button>
        <div className="output">
          <strong>Lazy Seq Result:</strong> {state.lazySeqResult}
        </div>
      </div>
    </div>
  );
};

export default App;
