import React, { useState } from 'react';
import './LinearSearchVisualiser.css';

const LinearSearch = () => {
  const [array, setArray] = useState([5, 2, 4, 1, 3]);
  const [target, setTarget] = useState(4);
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomData = () => {
    if (isSearching) return;
    // Generate a new random array of 5 numbers
    const newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
    setArray(newArr);
    
    // Pick a random number from the array to be our target so it's guaranteed to be found
    const newTarget = newArr[Math.floor(Math.random() * newArr.length)];
    setTarget(newTarget);
    
    setCurrentIndex(null);
    setFoundIndex(null);
  };

  const linearSearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setCurrentIndex(null);
    setFoundIndex(null);

    // Loop through the array one by one (Linear Search)
    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await delay(600); // Pause to show the current box being scanned

      if (array[i] === target) {
        setFoundIndex(i); // Mark as found
        setCurrentIndex(null);
        setIsSearching(false);
        return; // Stop searching once found
      }
    }

    // Fallback if not found
    setCurrentIndex(null);
    setIsSearching(false);
  };

  const getBoxClass = (index) => {
    if (index === foundIndex) return 'box found';
    if (index === currentIndex) return 'box scanning';
    return 'box default';
  };

  return (
    <div className="visualizer-container">
      <h2>Linear Search Visualizer</h2>
      
      <div className="target-display">
        Searching for Target: <strong>{target}</strong>
      </div>

      <div className="boxes-container">
        {array.map((value, index) => (
          <div key={index} className={getBoxClass(index)}>
            {value}
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="legend-item"><div className="box-mini scanning"></div> Scanning</span>
        <span className="legend-item"><div className="box-mini found"></div> Target Found</span>
      </div>

      <div className="controls">
        <button onClick={generateRandomData} disabled={isSearching}>
          Randomize
        </button>
        <button onClick={linearSearch} disabled={isSearching}>
          Search
        </button>
      </div>
    </div>
  );
};

export default LinearSearch;