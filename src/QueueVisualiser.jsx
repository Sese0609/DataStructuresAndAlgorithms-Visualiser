import React, { useState } from "react";
import "./QueueVisualiser.css";

export default function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const MAX_ITEMS = 5;
  const isFull = queue.length >= MAX_ITEMS;

  const handleEnqueue = () => {
    if (inputValue.trim() === "" || isFull) return;
    // Adds the new item to the back (end of the array)
    setQueue([...queue, inputValue]);
    setInputValue("");
  };

  const handleDequeue = () => {
    if (queue.length === 0) return;
    // Removes the first item from the front (index 0)
    setQueue(queue.slice(1));
  };

  const handleClear = () => {
    setQueue([]);
  };

  return (
    <div className="visualizer-container">
      <h2>Queue Visualizer</h2>
      
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
          disabled={isFull}
        />
        <button onClick={handleEnqueue} disabled={isFull}>
          Enqueue
        </button>
        <button onClick={handleDequeue} disabled={queue.length === 0}>
          Dequeue
        </button>
        <button onClick={handleClear} disabled={queue.length === 0}>
          Clear
        </button>
      </div>

      {isFull && <p className="limit-message">Queue is full (Max {MAX_ITEMS})</p>}

      <div className="queue-container">
        {queue.length === 0 ? (
          <p className="empty-text">Queue is empty</p>
        ) : (
          queue.map((item, index) => (
            <div key={index} className="queue-item">
              {item}
            </div>
          ))
        )}
      </div>
      
      {/* Labels to show which way the queue flows */}
      <div className="queue-labels">
        <span>Front (Dequeue here)</span>
        <span>Back (Enqueue here)</span>
      </div>
    </div>
  );
}