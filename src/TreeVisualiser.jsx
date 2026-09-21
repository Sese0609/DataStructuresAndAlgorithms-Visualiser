import React, { useState } from "react";
import "./TreeVisualiser.css";

// Helper function to insert a value into the Binary Search Tree
const insertNode = (node, value) => {
  if (!node) {
    return { value, left: null, right: null };
  }
  if (value < node.value) {
    return { ...node, left: insertNode(node.left, value) };
  } else if (value > node.value) {
    return { ...node, right: insertNode(node.right, value) };
  }
  // If the value is equal, we just return the node (no duplicates)
  return node;
};

// Recursive component to render the tree nodes
const TreeNode = ({ node }) => {
  if (!node) return null;

  const hasChildren = node.left || node.right;

  return (
    <li>
      <div className="tree-node">{node.value}</div>
      {hasChildren && (
        <ul>
          {/* Render left child, or an invisible placeholder if only right exists */}
          {node.left ? <TreeNode node={node.left} /> : <li className="empty-node"></li>}
          {/* Render right child, or an invisible placeholder if only left exists */}
          {node.right ? <TreeNode node={node.right} /> : <li className="empty-node"></li>}
        </ul>
      )}
    </li>
  );
};

export default function TreeVisualizer() {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleInsert = () => {
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue)) return; // Only accept numbers

    setRoot((prevRoot) => insertNode(prevRoot, numValue));
    setInputValue("");
  };

  const handleClear = () => {
    setRoot(null);
  };

  return (
    <div className="visualizer-container">
      <h2>Binary Search Tree Visualizer</h2>
      
      <div className="controls">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInsert()}
          placeholder="Enter a number"
        />
        <button onClick={handleInsert}>Insert</button>
        <button onClick={handleClear} disabled={!root} className="clear-btn">
          Clear
        </button>
      </div>

      <div className="tree-container">
        {root ? (
          <div className="css-tree">
            <ul>
              <TreeNode node={root} />
            </ul>
          </div>
        ) : (
          <p className="empty-text">Tree is empty. Insert a number to start!</p>
        )}
      </div>
    </div>
  );
}