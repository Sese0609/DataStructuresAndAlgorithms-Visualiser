import React, { useState, useEffect } from 'react';
import './DijkstraVisualiser.css';

const GRID_SIZE = 5;
const START_NODE = { row: 0, col: 0 };
const END_NODE = { row: 4, col: 4 };

const Dijkstra = () => {
  const [grid, setGrid] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Initialize the 5x5 grid
  useEffect(() => {
    resetGrid();
  }, []);

  const resetGrid = () => {
    if (isRunning) return;
    const initialGrid = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const currentRow = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        currentRow.push({
          row: r,
          col: c,
          isStart: r === START_NODE.row && c === START_NODE.col,
          isEnd: r === END_NODE.row && c === END_NODE.col,
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null,
        });
      }
      initialGrid.push(currentRow);
    }
    setGrid(initialGrid);
  };

  const toggleWall = (row, col) => {
    if (isRunning) return;
    const newGrid = [...grid];
    const node = newGrid[row][col];
    // Don't allow making the start or end nodes into walls
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      setGrid(newGrid);
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const visualizeDijkstra = async () => {
    if (isRunning) return;
    setIsRunning(true);

    // Deep copy grid to run logic without constantly triggering React renders
    const workingGrid = grid.map(row => row.map(node => ({ ...node })));
    const startNode = workingGrid[START_NODE.row][START_NODE.col];
    const endNode = workingGrid[END_NODE.row][END_NODE.col];
    
    startNode.distance = 0;
    const unvisitedNodes = workingGrid.flat();
    const visitedNodesInOrder = [];

    // Core Dijkstra Algorithm
    while (unvisitedNodes.length > 0) {
      // Sort to find the closest unvisited node
      unvisitedNodes.sort((a, b) => a.distance - b.distance);
      const closestNode = unvisitedNodes.shift();

      // If trapped, stop
      if (closestNode.distance === Infinity) break;
      if (closestNode.isWall) continue;

      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);

      // If reached the end, stop
      if (closestNode === endNode) break;

      // Update neighbors
      const neighbors = [];
      const { row, col } = closestNode;
      if (row > 0) neighbors.push(workingGrid[row - 1][col]); // Up
      if (row < GRID_SIZE - 1) neighbors.push(workingGrid[row + 1][col]); // Down
      if (col > 0) neighbors.push(workingGrid[row][col - 1]); // Left
      if (col < GRID_SIZE - 1) neighbors.push(workingGrid[row][col + 1]); // Right

      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          const newDistance = closestNode.distance + 1;
          if (newDistance < neighbor.distance) {
            neighbor.distance = newDistance;
            neighbor.previousNode = closestNode;
          }
        }
      }
    }

    // Animate Visited Nodes
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      if (!node.isStart && !node.isEnd) {
        setGrid(prev => {
          const newGrid = [...prev];
          newGrid[node.row][node.col].isVisited = true;
          return newGrid;
        });
        await delay(150);
      }
    }

    // Backtrack to find the shortest path
    const shortestPath = [];
    let currentNode = endNode.previousNode;
    while (currentNode !== null && !currentNode.isStart) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    // Animate Shortest Path
    for (let i = 0; i < shortestPath.length; i++) {
      const node = shortestPath[i];
      setGrid(prev => {
        const newGrid = [...prev];
        newGrid[node.row][node.col].isPath = true;
        return newGrid;
      });
      await delay(150);
    }

    setIsRunning(false);
  };

  const getBoxClass = (node) => {
    if (node.isStart) return 'box start';
    if (node.isEnd) return 'box end';
    if (node.isWall) return 'box wall';
    if (node.isPath) return 'box path';
    if (node.isVisited) return 'box visited';
    return 'box default';
  };

  return (
    <div className="visualizer-container">
      <h2>Dijkstra's Algorithm Visualizer</h2>
      <p className="instructions">Click empty boxes to create walls, then run the algorithm.</p>
      
      <div className="grid-container">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => (
              <div 
                key={nodeIdx} 
                className={getBoxClass(node)}
                onClick={() => toggleWall(node.row, node.col)}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div className="legend">
        <span className="legend-item"><div className="box-mini start"></div> Start</span>
        <span className="legend-item"><div className="box-mini end"></div> End</span>
        <span className="legend-item"><div className="box-mini wall"></div> Wall</span>
        <span className="legend-item"><div className="box-mini visited"></div> Visited</span>
        <span className="legend-item"><div className="box-mini path"></div> Shortest Path</span>
      </div>

      <div className="controls">
        <button onClick={resetGrid} disabled={isRunning}>Reset Grid</button>
        <button onClick={visualizeDijkstra} disabled={isRunning}>Find Path</button>
      </div>
    </div>
  );
};

export default Dijkstra;