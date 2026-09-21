import React, { useState } from 'react';
import './MergeSortVisualiser.css';

const MergeSort = () => {
  const [array, setArray] = useState([5, 2, 4, 1, 3]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeRange, setActiveRange] = useState([]); // The sub-array currently being merged
  const [comparingIndices, setComparingIndices] = useState([]); // The two items being compared
  const [isFullySorted, setIsFullySorted] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateRandomArray = () => {
    if (isSorting) return;
    const newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
    setArray(newArr);
    setIsFullySorted(false);
    setActiveRange([]);
    setComparingIndices([]);
  };

  const mergeSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setIsFullySorted(false);

    let arr = [...array];

    const merge = async (l, m, r) => {
      setActiveRange([l, r]);
      await delay(600);

      // Create copies of the left and right halves
      let left = arr.slice(l, m + 1);
      let right = arr.slice(m + 1, r + 1);
      
      let i = 0, j = 0, k = l;

      // Merge the arrays back into 'arr' in sorted order
      while (i < left.length && j < right.length) {
        setComparingIndices([l + i, m + 1 + j]);
        await delay(600);

        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
        } else {
          arr[k] = right[j];
          j++;
        }
        setArray([...arr]);
        await delay(400);
        k++;
      }

      // Catch any remaining elements
      while (i < left.length) {
        arr[k] = left[i];
        setArray([...arr]);
        i++; k++;
        await delay(200);
      }
      while (j < right.length) {
        arr[k] = right[j];
        setArray([...arr]);
        j++; k++;
        await delay(200);
      }
      setComparingIndices([]);
    };

    const sortLogic = async (l, r) => {
      if (l >= r) return;
      let m = l + Math.floor((r - l) / 2);
      await sortLogic(l, m);
      await sortLogic(m + 1, r);
      await merge(l, m, r);
    };

    await sortLogic(0, arr.length - 1);
    
    setActiveRange([]);
    setIsFullySorted(true);
    setIsSorting(false);
  };

  const getBoxClass = (index) => {
    if (isFullySorted) return 'box sorted';
    if (comparingIndices.includes(index)) return 'box comparing';
    if (activeRange.length > 0 && index >= activeRange[0] && index <= activeRange[1]) return 'box active-range';
    return 'box default';
  };

  return (
    <div className="visualizer-container">
      <h2>Merge Sort Visualizer</h2>
      
      <div className="boxes-container">
        {array.map((value, index) => (
          <div key={index} className={getBoxClass(index)}>
            {value}
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="legend-item"><div className="box-mini active-range"></div> Merging Area</span>
        <span className="legend-item"><div className="box-mini comparing"></div> Comparing</span>
        <span className="legend-item"><div className="box-mini sorted"></div> Sorted</span>
      </div>

      <div className="controls">
        <button onClick={generateRandomArray} disabled={isSorting}>Randomize</button>
        <button onClick={mergeSort} disabled={isSorting}>Sort</button>
      </div>
    </div>
  );
};

export default MergeSort;