import React, { useState, useEffect } from 'react';
import './BinarySearchVisualiser.css';

const BinarySearch = () => {
  // Binary search requires a sorted array
  const [array, setArray] = useState([1, 3, 5, 7, 9]);
  const [target, setTarget] = useState(7);
  const [isSearching, setIsSearching] = useState(false);
  
  // Track pointers to visualize the search space
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(4);
  const [midIndex, setMidIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomData = () => {
    if (isSearching) return;
    
    // Generate 5 random numbers and sort them numerically
    const newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1)
                        .sort((a, b) => a - b);
    setArray(newArr);
    
    // Pick a random target from the array
    const newTarget = newArr[Math.floor(Math.random() * newArr.length)];
    setTarget(newTarget);
    
    // Reset state
    setLeftIndex(0);
    setRightIndex(4);
    setMidIndex(null);
    setFoundIndex(null);
  };

  const binarySearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFoundIndex(null);

    let left = 0;
    let right = array.length - 1;

    setLeftIndex(left);
    setRightIndex(right);
    await delay(600);

    while (left <= right) {
      // Calculate the middle index
      let mid = Math.floor((left + right) / 2);
      setMidIndex(mid);
      await delay(800); // Pause to show the middle element being checked

      if (array[mid] === target) {
        setFoundIndex(mid);
        setMidIndex(null);
        setIsSearching(false);
        return;
      }

      if (array[mid] < target) {
        // Target is larger, ignore left half
        left = mid + 1;
      } else {
        // Target is smaller, ignore right half
        right = mid - 1;
      }

      setLeftIndex(left);
      setRightIndex(right);
      setMidIndex(null);
      await delay(600); // Pause to show the new search bounds
    }

    setIsSearching(false);
  };

  const getBoxClass = (index) => {
    if (index === foundIndex) return 'box found';
    if (index === midIndex) return 'box mid';
    // If an element is outside the current left-right boundaries, it is eliminated
    if (index < leftIndex || index > rightIndex) return 'box eliminated';
    return 'box default';
  };

  return (
    <div className="visualizer-container">
      <h2>Binary Search Visualizer</h2>
      
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
        <span className="legend-item"><div className="box-mini default"></div> In Search Range</span>
        <span className="legend-item"><div className="box-mini mid"></div> Checking Middle</span>
        <span className="legend-item"><div className="box-mini eliminated"></div> Eliminated</span>
        <span className="legend-item"><div className="box-mini found"></div> Target Found</span>
      </div>

      <div className="controls">
        <button onClick={generateRandomData} disabled={isSearching}>
          Randomize
        </button>
        <button onClick={binarySearch} disabled={isSearching}>
          Search
        </button>
      </div>
    </div>
  );
};

export default BinarySearch;