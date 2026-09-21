import React, { useState } from 'react';
import './BubbleSortVisualiser.css';

const BubbleSort = () => {
  // Initialized with exactly 5 numbers
  const [array, setArray] = useState([5, 2, 4, 1, 3]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);

  // Helper function to slow down the loop for animation
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 99) + 1);
    setArray(newArray);
    setActiveIndices([]);
  };

  const bubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        
        // Highlight the two boxes being compared
        setActiveIndices([j, j + 1]);
        await sleep(500); 

        if (arr[j] > arr[j + 1]) {
          // Swap the values
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          // Update state to trigger re-render
          setArray([...arr]);
          await sleep(500); 
        }
      }
    }
    
    // Clear highlights when finished
    setActiveIndices([]);
    setIsSorting(false);
  };

  return (
    <div className="bubble-sort-container">
      <h2>Bubble Sort (5 Boxes)</h2>
      
      <div className="boxes-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`box ${activeIndices.includes(index) ? 'active' : ''}`}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={generateRandomArray} disabled={isSorting}>
          Randomize
        </button>
        <button onClick={bubbleSort} disabled={isSorting}>
          Sort!
        </button>
      </div>
    </div>
  );
};

export default BubbleSort;