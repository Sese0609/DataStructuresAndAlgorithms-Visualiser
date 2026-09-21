import React, { useState, useEffect, useRef } from 'react';
import './BFSVisualiser.css';

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

export default function BfsVisualiser() {
  const [currentNode, setCurrentNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [queuedNodes, setQueuedNodes] = useState([]);
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
    setQueuedNodes([]);
    setIsRunning(false);
  };

  const runBFS = (startId) => {
    clearVisualization();
    const adj = getAdjacencyList();
    const frames = [];
    const queue = [startId];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const current = queue.shift();
      frames.push({ current, visited: Array.from(visited), queued: [...queue] });

      adj[current].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          frames.push({ current, visited: Array.from(visited), queued: [...queue] });
        }
      });
    }

    setIsRunning(true);
    frames.forEach((frame, index) => {
      const timeout = setTimeout(() => {
        setCurrentNode(frame.current);
        setVisitedNodes(frame.visited);
        setQueuedNodes(frame.queued);
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
    <div className="bfs-container">
      <div className="bfs-controls">
        <button disabled={isRunning} onClick={() => runBFS('A')}>Run BFS</button>
        <button onClick={clearVisualization}>Reset</button>
      </div>
      <svg className="bfs-canvas">
        {INITIAL_EDGES.map((edge, i) => {
          const source = getNodeCoords(edge.source);
          const target = getNodeCoords(edge.target);
          return (
            <line key={i} x1={source.x} y1={source.y} x2={target.x} y2={target.y} className="bfs-edge" />
          );
        })}
        {INITIAL_NODES.map(node => {
          const isCurrent = currentNode === node.id;
          const isVisited = visitedNodes.includes(node.id);
          const isQueued = queuedNodes.includes(node.id);

          let nodeClass = "bfs-node";
          if (isCurrent) nodeClass += " current";
          else if (isQueued) nodeClass += " queued";
          else if (isVisited) nodeClass += " visited";

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle r="24" className={nodeClass} />
              <text y="5" className="bfs-label" textAnchor="middle">{node.id}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
