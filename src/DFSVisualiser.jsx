import React, { useState, useRef } from 'react';
import './DfsVisualiser.css';

const INITIAL_NODES = [
  { id: 'A', x: 300, y: 50 }, { id: 'B', x: 150, y: 150 },
  { id: 'C', x: 450, y: 150 }, { id: 'D', x: 75, y: 250 },
  { id: 'E', x: 225, y: 250 }, { id: 'F', x: 375, y: 250 },
  { id: 'G', x: 525, y: 250 }
];

const INITIAL_EDGES = [
  { source: 'A', target: 'B' }, { source: 'A', target: 'C' },
  { source: 'B', target: 'D' }, { source: 'B', target: 'E' },
  { source: 'C', target: 'F' }, { source: 'C', target: 'G' }
];

// Helper to create a consistent edge ID (e.g., 'A-B' is the same as 'B-A')
const getEdgeId = (n1, n2) => [n1, n2].sort().join('-');

export default function DfsVisualiser() {
  const [currentNode, setCurrentNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [stackedNodes, setStackedNodes] = useState([]);
  const [traversedEdges, setTraversedEdges] = useState([]); // New state for edges
  const [isRunning, setIsRunning] = useState(false);
  
  const timeoutIds = useRef([]);

  const getAdjacencyList = () => {
    const adj = {};
    INITIAL_NODES.forEach(n => adj[n.id] = []);
    INITIAL_EDGES.forEach(edge => {
      adj[edge.source].push(edge.target);
      adj[edge.target].push(edge.source);
    });
    return adj;
  };

  const clearVisualization = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    setCurrentNode(null);
    setVisitedNodes([]);
    setStackedNodes([]);
    setTraversedEdges([]);
    setIsRunning(false);
  };

  const runDFS = (startId) => {
    clearVisualization();
    const adj = getAdjacencyList();
    const frames = [];
    
    // Now storing the node AND its parent to track the path
    const stack = [{ id: startId, parent: null }];
    const visited = new Set();
    const edges = new Set();

    while (stack.length > 0) {
      const { id: current, parent } = stack.pop();
      
      if (!visited.has(current)) {
        visited.add(current);
        
        // If this node had a parent, we traversed the edge between them
        if (parent) {
          edges.add(getEdgeId(parent, current));
        }
        
        frames.push({ 
          current, 
          visited: Array.from(visited), 
          stacked: stack.map(s => s.id),
          edges: Array.from(edges)
        });

        const neighbors = [...adj[current]].reverse();
        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            stack.push({ id: neighbor, parent: current });
            frames.push({ 
              current, 
              visited: Array.from(visited), 
              stacked: stack.map(s => s.id),
              edges: Array.from(edges)
            });
          }
        });
      }
    }

    setIsRunning(true);
    frames.forEach((frame, index) => {
      const timeout = setTimeout(() => {
        setCurrentNode(frame.current);
        setVisitedNodes(frame.visited);
        setStackedNodes(frame.stacked);
        setTraversedEdges(frame.edges);
        
        if (index === frames.length - 1) {
          setIsRunning(false);
          setCurrentNode(null);
        }
      }, index * 800);
      timeoutIds.current.push(timeout);
    });
  };

  const getNodeCoords = (id) => INITIAL_NODES.find(n => n.id === id);

  return (
    <div className="dfs-container">
      <div className="dfs-controls">
        <button disabled={isRunning} onClick={() => runDFS('A')}>Run DFS</button>
        <button onClick={clearVisualization}>Reset</button>
      </div>

      <svg className="dfs-canvas">
        {INITIAL_EDGES.map((edge, i) => {
          const source = getNodeCoords(edge.source);
          const target = getNodeCoords(edge.target);
          const edgeId = getEdgeId(edge.source, edge.target);
          const isTraversed = traversedEdges.includes(edgeId);

          return (
            <line 
              key={i} 
              x1={source.x} y1={source.y} 
              x2={target.x} y2={target.y} 
              className={`dfs-edge ${isTraversed ? 'traversed' : ''}`} 
            />
          );
        })}

        {INITIAL_NODES.map(node => {
          const isCurrent = currentNode === node.id;
          const isVisited = visitedNodes.includes(node.id);
          const isStacked = stackedNodes.includes(node.id);

          let nodeClass = "dfs-node";
          if (isCurrent) nodeClass += " current";
          else if (isStacked) nodeClass += " stacked";
          else if (isVisited) nodeClass += " visited";

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle r="24" className={nodeClass} />
              <text y="5" className="dfs-label" textAnchor="middle">{node.id}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}