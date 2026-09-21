import React, { useState } from "react";
import "./HashTableVisualiser.css";

const TABLE_SIZE = 5;

export default function HashTableVisualizer() {
  const [table, setTable] = useState(
    Array.from({ length: TABLE_SIZE }, () => [])
  );
  
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const hashFunction = (key) => {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % TABLE_SIZE;
  };

  const handleInsert = () => {
    if (keyInput.trim() === "" || valueInput.trim() === "") return;

    const index = hashFunction(keyInput);
    const newTable = [...table];
    
    const bucket = [...newTable[index]];
    const existingItemIndex = bucket.findIndex(item => item.key === keyInput);
    
    if (existingItemIndex >= 0) {
      bucket[existingItemIndex].value = valueInput; 
    } else {
      bucket.push({ key: keyInput, value: valueInput }); 
    }
    
    newTable[index] = bucket;
    setTable(newTable);
    
    setKeyInput("");
    setValueInput("");
  };

  const handleClear = () => {
    setTable(Array.from({ length: TABLE_SIZE }, () => []));
  };

  return (
    <div className="visualizer-container">
      <h2>Hash Table Visualizer</h2>
      
      <div className="controls">
        <input
          type="text"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          placeholder="Key (e.g., name)"
        />
        <input
          type="text"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInsert()}
          placeholder="Value (e.g., 23)"
        />
        <button onClick={handleInsert} className="btn-insert">
          Insert
        </button>
        <button onClick={handleClear} className="btn-clear">
          Clear
        </button>
      </div>

      <div className="hash-table-container">
        {table.map((bucket, index) => (
          <div key={index} className="bucket-row">
            <div className="bucket-index">
              Index {index}
            </div>
            
            <div className="bucket-items">
              {bucket.length === 0 ? (
                <span className="empty-bucket">Empty</span>
              ) : (
                bucket.map((item, i) => (
                  <div key={i} className="hash-item">
                    <span className="hash-key">{item.key}</span>
                    <span className="hash-value">{item.value}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      
      <p className="helper-text">
        Try entering different keys. Keys that result in the same index will "chain" together!
      </p>
    </div>
  );
}