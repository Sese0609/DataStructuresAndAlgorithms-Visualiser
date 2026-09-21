import React, { useState } from 'react';
import './InsertionSortVisualiser.css';

const InsertionSort = () => {
  const [array, setArray] = useState([5, 2, 4, 1, 3]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [sortedUpToIndex, setSortedUpToIndex] = useState(0);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
    setArray(newArr);
    setSortedUpToIndex(0);
    setCurrentIndex(null);
    setComparingIndex(null);
  };

  const insertionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    let arr = [...array];
    setSortedUpToIndex(0);

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      setCurrentIndex(i); // Highlight the element we want to insert
      await delay(600); 

      let j = i - 1;

      // Scan backwards through the sorted portion
      while (j >= 0) {
        setComparingIndex(j);
        await delay(600);

        if (arr[j] > key) {
          // Shift the larger element to the right
          arr[j + 1] = arr[j];
          setArray([...arr]);
          j = j - 1;
          await delay(400); // Pause to show the shift
        } else {
          // We found the correct spot, stop scanning
          break;
        }
      }

      // Insert the key into its correct position
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedUpToIndex(i); // Expand the "sorted" boundary
      
      setCurrentIndex(null);
      setComparingIndex(null);
      await delay(400);
    }

    // Mark the whole array as sorted at the end
    setSortedUpToIndex(arr.length - 1);
    setIsSorting(false);
  };

  // Helper function to determine the class/color of each box
  const getBoxClass = (index) => {
    if (index === currentIndex) return 'box current';
    if (index === comparingIndex) return 'box comparing';
    if (index <= sortedUpToIndex) return 'box sorted';
    return 'box default';
  };

  return (
    <div className="visualizer-container">
      <h2>Insertion Sort Visualizer</h2>
      
      <div className="boxes-container">
        {array.map((value, index) => (
          <div key={index} className={getBoxClass(index)}>
            {value}
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="legend-item"><div className="box-mini current"></div> Inserting</span>
        <span className="legend-item"><div className="box-mini comparing"></div> Comparing</span>
        <span className="legend-item"><div className="box-mini sorted"></div> Sorted Portion</span>
      </div>

      <div className="controls">
        <button onClick={generateRandomArray} disabled={isSorting}>
          Randomize
        </button>
        <button onClick={insertionSort} disabled={isSorting}>
          Sort
        </button>
      </div>
    </div>
  );
};

export default InsertionSort;