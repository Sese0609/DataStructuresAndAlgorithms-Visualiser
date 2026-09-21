import React, { useState } from 'react';
import './QuickSortVisualiser.css';

const QuickSort = () => {
  const [array, setArray] = useState([5, 2, 4, 1, 3]);
  const [isSorting, setIsSorting] = useState(false);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);
  const [swappingIndex, setSwappingIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState([]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
    setArray(newArr);
    setSortedIndices([]);
    setPivotIndex(null);
    setComparingIndex(null);
    setSwappingIndex(null);
  };

  const quickSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    let arr = [...array];

    const partition = async (low, high) => {
      let pivot = arr[high]; // Choose the last element as pivot
      setPivotIndex(high);
      await delay(600);

      let i = low - 1;

      for (let j = low; j < high; j++) {
        setComparingIndex(j);
        await delay(500);

        if (arr[j] < pivot) {
          i++;
          setSwappingIndex(i);
          // Swap if the element is smaller than the pivot
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          setArray([...arr]);
          await delay(500);
        }
      }

      // Finally, swap the pivot into its correct place
      setSwappingIndex(i + 1);
      await delay(500);
      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setArray([...arr]);
      await delay(500);

      setPivotIndex(null);
      setComparingIndex(null);
      setSwappingIndex(null);
      
      return i + 1; // Return the final permanent index of the pivot
    };

    const sortLogic = async (low, high) => {
      if (low < high) {
        let pi = await partition(low, high);
        setSortedIndices(prev => [...prev, pi]); // Lock pivot in place
        
        await sortLogic(low, pi - 1);
        await sortLogic(pi + 1, high);
      } else if (low === high) {
        setSortedIndices(prev => [...prev, low]); // Single element is inherently sorted
      }
    };

    await sortLogic(0, arr.length - 1);
    setIsSorting(false);
  };

  const getBoxClass = (index) => {
    if (sortedIndices.includes(index)) return 'box sorted';
    if (index === pivotIndex) return 'box pivot';
    if (index === comparingIndex) return 'box comparing';
    if (index === swappingIndex) return 'box swapping';
    return 'box default';
  };

  return (
    <div className="visualizer-container">
      <h2>Quick Sort Visualizer</h2>
      
      <div className="boxes-container">
        {array.map((value, index) => (
          <div key={index} className={getBoxClass(index)}>
            {value}
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="legend-item"><div className="box-mini pivot"></div> Pivot</span>
        <span className="legend-item"><div className="box-mini comparing"></div> Scanning</span>
        <span className="legend-item"><div className="box-mini swapping"></div> Swapping Area</span>
        <span className="legend-item"><div className="box-mini sorted"></div> Sorted (Locked)</span>
      </div>

      <div className="controls">
        <button onClick={generateRandomArray} disabled={isSorting}>Randomize</button>
        <button onClick={quickSort} disabled={isSorting}>Sort</button>
      </div>
    </div>
  );
};

export default QuickSort;