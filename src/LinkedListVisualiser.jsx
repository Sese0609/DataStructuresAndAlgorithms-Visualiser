import { useState } from "react";
import './LinkedListVisualiser.css';

export default function LinkedListVisualizer() {
  const [text, setText] = useState("10, 20, 30");

  const items = text
    .split(",")
    .map((str) => str.trim())
    .filter(Boolean)
    .slice(0, 6);

  const getAddress = (index) => `0x${100 + (index * 4)}`;

  return (
    <div className="ll-container">
      <input
        className="ll-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type up to 6 numbers..."
      />

      <div className="ll-list">
        {items.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            
            <div className="ll-address">{getAddress(index)}</div>

            <div style={{ display: "flex", alignItems: "center" }}>
              {/* The Node Box */}
              <div className="ll-node">
                <div className="ll-data">{item}</div>
                
                <div className="ll-pointer">
                  {index === items.length - 1 ? "null" : getAddress(index + 1)}
                </div>
              </div>

              {/* The Arrow */}
              <div className="ll-arrow">➔</div>

              {index === items.length - 1 && (
                <div className="ll-null" style={{ marginTop: "15px" }}>null</div>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}