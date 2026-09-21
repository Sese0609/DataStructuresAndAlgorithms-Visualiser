import React, { useState } from 'react';
import './SelectionSortVisualiser.css';

const SelectionSortVisualiser = () => {
  const [array, setArray] = useState([5, 2, 4, 1, 3]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [minIndex, setMinIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState([]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
    setArray(newArr);
    setSortedIndices([]);
    setCurrentIndex(null);
    setComparingIndex(null);
    setMinIndex(null);
  };

  const selectionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    let arr = [...array];
    let sorted = [];

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      setCurrentIndex(i);
      setMinIndex(minIdx);

      for (let j = i + 1; j < arr.length; j++) {
        setComparingIndex(j);
        await delay(600); // Pause to show the comparison

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setMinIndex(minIdx);
          await delay(400); // Pause to show the new minimum found
        }
      }

      // Swap if a smaller element was found
      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArray([...arr]);
        await delay(600); // Pause to show the swap
      }

      // Mark the current position as sorted
      sorted.push(i);
      setSortedIndices([...sorted]);
    }

    // Cleanup states after sorting finishes
    setCurrentIndex(null);
    setComparingIndex(null);
    setMinIndex(null);
    setIsSorting(false);
  };

  // Helper function to determine the class/color of each box
  const getBoxClass = (index) => {
    if (sortedIndices.includes(index)) return 'box sorted';
    if (index === minIndex) return 'box minimum';
    if (index === comparingIndex) return 'box comparing';
    if (index === currentIndex) return 'box current';
    return 'box default';
  };

  return (
    <div className="visualizer-container">
      <h2>Selection Sort Visualizer</h2>
      
      <div className="boxes-container">
        {array.map((value, index) => (
          <div key={index} className={getBoxClass(index)}>
            {value}
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="legend-item"><div className="box-mini current"></div> Current</span>
        <span className="legend-item"><div className="box-mini comparing"></div> Scanning</span>
        <span className="legend-item"><div className="box-mini minimum"></div> Current Min</span>
        <span className="legend-item"><div className="box-mini sorted"></div> Sorted</span>
      </div>

      <div className="controls">
        <button onClick={generateRandomArray} disabled={isSorting}>
          Randomize
        </button>
        <button onClick={selectionSort} disabled={isSorting}>
          Sort
        </button>
      </div>
    </div>
  );
};

export default SelectionSortVisualiser;