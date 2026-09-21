import React, { useState } from "react";
import "./StackVisualiser.css";

export default function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  

  const MAX_ITEMS = 5;
  const isFull = stack.length >= MAX_ITEMS;

  const handlePush = () => {

    if (inputValue.trim() === "" || isFull) return;
    
    setStack([...stack, inputValue]);
    setInputValue("");
  };

  const handlePop = () => {
    if (stack.length === 0) return;
    setStack(stack.slice(0, -1));
  };

  const handleClear = () => {
    setStack([]);
  };

  return (
    <div className="visualizer-container">
      <h2>Stack Visualizer</h2>
      
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
          disabled={isFull} 
        />
       
        <button onClick={handlePush} disabled={isFull}>
          Push
        </button>
        <button onClick={handlePop} disabled={stack.length === 0}>
          Pop
        </button>
        <button onClick={handleClear} disabled={stack.length === 0}>
          Clear
        </button>
      </div>

      {isFull && <p className="limit-message">Stack is full (Max {MAX_ITEMS} for this visualiser)</p>}

      <div className="stack-container">
        {stack.length === 0 ? (
          <p className="empty-text">Stack is empty</p>
        ) : (
          stack.map((item, index) => (
            <div key={index} className="stack-item">
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}