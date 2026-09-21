import React from "react";
import { useState } from "react";
import './ArrayVisualiser.css';


export default function ArrayVisualizer() {
  const [text, setText] = useState("10, 20, 30, 40, 50");


  const items = text
    .split(",")
    .map((str) => str.trim())
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div className="array-visualizer-container">
      <input
        className="array-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type up to 6 numbers..."
      />

      <div className="array-list">
        {items.map((item, index) => (
          <div key={index} className="array-item-wrapper">
            <div className="array-box">
              {item}
            </div>
            <div className="array-index">
              {index}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}