import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'; 
import ArrayVisualiser from './ArrayVisualiser'; 
import LinkedListVisualiser from './LinkedListVisualiser';
import StackVisualiser from './StackVisualiser';
import QueueVisualiser from './QueueVisualiser';
import TreeVisualiser from './TreeVisualiser';
import HashtableVisualiser from './HashtableVisualiser';
import BubbleSortVisualiser from './BubbleSortVisualiser';
import SelectionSortVisualiser from './SelectionSortVisualiser';
import InsertionSortVisualiser from './InsertionSortVisualiser';
import MergeSortVisualiser from './MergeSortVisualiser';
import QuickSortVisualiser from './QuickSortVisualiser';
import LinearSearchVisualiser from './LinearSearchVisualiser';
import BinarySearchVisualiser from './BinarySearchVisualiser';
import DijkstraVisualiser from './DijkstraVisualiser';
import BFSVisualiser from './BFSVisualiser';
import DFSVisualiser from './DFSVisualiser';


// Home page
function Home() {
  return (
    <div className="main-container">
      <div className="title-section">
        <h1>Data Structures & Algorithms Visualizer!</h1>
        <p>Interactive visualizations for data structures and algorithms.</p>
      </div>

      <div className="button-group">
        <Link to="/data-structures" className="nav-link">Data Structures</Link>
        <Link to="/algorithms" className="nav-link">Algorithms</Link>
      </div>
    </div>
  );
}

// Data structures page
function DataStructures() {
  return (
    <div className="main-container">
      <div className="title-section">
        <h1>Data Structures</h1>
        <p>Select one of the following data structures to visualize:</p>
      </div>
      <div className ="button-group">
        <Link to="/data-structures/array" className="nav-link">Array</Link>
        <Link to="/data-structures/linked-list" className="nav-link">Linked List</Link>
        <Link to="/data-structures/stack" className="nav-link">Stack</Link>
        <Link to="/data-structures/queue" className="nav-link">Queue</Link>
        <Link to="/data-structures/tree" className="nav-link">Tree's</Link>
        <Link to="/data-structures/hash-table" className="nav-link">Hash Table</Link>
      </div>
      <div className="button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>
    </div>
  );
}

function Algorithms() {
  return (
    <div className="main-container">
      <div className="title-section">
        <h1>Algorithms</h1>
        <p>Select one of the following algorithm groups below to begin.</p>
      </div>
      <div className="button-group">
        <Link to="/algorithms/sorting" className="nav-link">Sorting</Link>
        <Link to="/algorithms/searching" className="nav-link">Searching</Link>
        <Link to="/algorithms/graph" className="nav-link">Graph Algorithms</Link>
      </div>
      <div className="button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>
    </div>
  );
} 



function ArrayPage() {
  return (
    <div className="main-container">
      <div className="title-section">
        <h1>Array</h1>
        <p>Enter comma-separated values to visualize an array.</p>

      </div>

      <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

      <ArrayVisualiser />


    </div>
  );
}

function LinkedListPage() {
  return (
    <div className="main-container">
      <div className="title-section">
        <h1>Linked List</h1>
        <p>A linked list is a linear data structure where each element is a separate object containing a reference to the next element.</p>
      </div>

      <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>
      <LinkedListVisualiser />
    </div>

  );
}

function StackPage(){
    return(
        <div className="main-container">
            <div className="title-section">
                <h1>Stack</h1>
                <p>A stack is a linear data structure that follows the Last In First Out (LIFO) principle.</p>
            </div>
            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>
      <StackVisualiser />
        </div>  
    )
}

function QueuePage(){
    return(
        <div className="main-container">
            <div className="title-section">
                <h1>Queue</h1>
                <p>A queue is a linear data structure that follows the First In First Out (FIFO) principle.</p>
            </div>
            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>
      <QueueVisualiser />
        </div>  
    )
}

function TreePage(){
    return(
        <div className="main-container">
            <div className="title-section">
                <h1>Tree</h1>                                                 
                <p>A tree is a hierarchical data structure consisting of nodes, with a root node and child nodes.</p>
            </div>
            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>
      <TreeVisualiser />
        </div>  
    )
}


function HashTablePage(){
    return(
        <div className="main-container">
            <div className="title-section">
                <h1>Hash Table</h1>                                                                   
                <p>A hash table is a data structure that stores key-value pairs and uses a hash function to compute an index into an array of buckets or slots.</p>
            </div>
            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>
      <HashtableVisualiser />
        </div>  
    )
}       

function SortingPage() {
    return (
        <div className="main-container">
            
        
            <div className="title-section">
                <h1>Sorting Algorithms</h1>
                <p>Interactive visualization of sorting algorithms.</p>
            </div>            
            
            <div className="button-group">
                <Link to="/algorithms/sorting/bubble-sort" className="nav-link">Bubble Sort</Link>  
                <Link to="/algorithms/sorting/selection-sort" className="nav-link">Selection Sort</Link>
                <Link to="/algorithms/sorting/insertion-sort" className="nav-link">Insertion Sort</Link>
                <Link to="/algorithms/sorting/merge-sort" className="nav-link">Merge Sort</Link>
                <Link to="/algorithms/sorting/quick-sort" className="nav-link">Quick Sort</Link>
            </div>

            <div className="visualization-area">
            </div>

            <div className="button-group3">
                <Link to="/" className="nav-link">Back to Home</Link>
            </div>
            
        </div>  
    );
}




function SearchingPage(){
    return(
        <div className="main-container">
            <div className="title-section">
                <h1>Searching Algorithms</h1>
                <p>Interactive visualization of searching algorithms.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

      <div className="visualization-area">
      </div>

      <div className="button-group">
        <Link to="/algorithms/searching/linear-search" className="nav-link">Linear Search</Link>
        <Link to="/algorithms/searching/binary-search" className="nav-link">Binary Search</Link>
      </div>
        </div>  
    )
}


function GraphAlgorithmsPage(){
    return(
        <div className="main-container">
            <div className="title-section">
                <h1>Graph Algorithms</h1>
                <p>Interactive visualization of graph algorithms.</p>
            </div>
            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

      <div className="visualization-area">
      </div>

      <div className="button-group">
        <Link to="/algorithms/graph/dijkstra" className="nav-link">Dijkstra's Algorithm</Link>
        <Link to="/algorithms/graph/bfs" className="nav-link">Breadth-First Search (BFS)</Link>
        <Link to="/algorithms/graph/dfs" className="nav-link">Depth-First Search (DFS)</Link>
      </div>
        </div>  
    )
}

function BubbleSortPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Bubble Sort</h1>
                <p>Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <BubbleSortVisualiser />
        </div>  
    );
}

function SelectionSortPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Selection Sort</h1>
                <p>Selection Sort repeatedly finds the minimum element from the unsorted part and places it at the beginning.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <SelectionSortVisualiser />
        </div>  
    );
}

function InsertionSortPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Insertion Sort</h1>
                <p>Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <InsertionSortVisualiser />
        </div>  
    );
}

function MergeSortPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Merge Sort</h1>
                <p>Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <MergeSortVisualiser />
        </div>  
    );
}

 function QuickSortPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Quick Sort</h1>
                <p>Quick Sort is a divide-and-conquer algorithm that works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <QuickSortVisualiser />
        </div>  
    );
}

function LinearSearchPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Linear Search</h1>
                <p>Linear Search is a simple algorithm that checks each element in a list sequentially until the target value is found or the end of the list is reached.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <LinearSearchVisualiser />
        </div>  
    );
}

function BinarySearchPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Binary Search</h1>
                <p>Binary Search is an efficient algorithm for finding an item in a sorted list. It works by repeatedly dividing the search interval in half until the target value is found or the interval is empty.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <BinarySearchVisualiser />
        </div>  
    );
}

function DijkstraPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Dijkstra's Algorithm</h1>
                <p>Dijkstra's Algorithm finds the shortest path between nodes in a weighted graph. It uses a priority queue to explore nodes in order of their distance from the source.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>

            <DijkstraVisualiser />
        </div>  
    );
}

function BFSPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Breadth-First Search (BFS)</h1>
                <p>BFS traverses the graph level by level, visiting all neighbors of a node before moving to the next level. It uses a queue (FIRST IN, FIRST OUT) data structure.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <BFSVisualiser />
        </div>  
    );
}

function DFSPage() {
    return (
        <div className="main-container">
            <div className="title-section">
                <h1>Depth-First Search (DFS)</h1>
                <p>DFS traverses through the tree as deeply as possible before backtracking. it uses a stack (LAST IN, FIRST OUT) data structure.</p>
            </div>

            <div className = "button-group3">
        <Link to="/" className="nav-link">Back to Home</Link>
      </div>

            <div className="visualization-area">
            </div>
            <DFSVisualiser />
        </div>  
    );
}




// The Router
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-structures" element={<DataStructures />} />
        <Route path="/data-structures/linked-list" element={<LinkedListPage />} />
        <Route path="/data-structures/stack" element={<StackPage />} />
        <Route path="/data-structures/queue" element={<QueuePage />} />
        <Route path="/data-structures/tree" element={<TreePage />} />
        <Route path="/data-structures/hash-table" element={<HashTablePage />} />
        <Route path="/data-structures/array" element={<ArrayPage />} />
        <Route path="/algorithms" element={<Algorithms />} />
        <Route path="/algorithms/sorting" element={<SortingPage />} />
        <Route path="/algorithms/searching" element={<SearchingPage />} />  
      <Route path="/algorithms/graph" element={<GraphAlgorithmsPage />} />
      <Route path="/algorithms/sorting/selection-sort" element={<SelectionSortPage />} /> 
      <Route path="/algorithms/sorting/insertion-sort" element={<InsertionSortPage />} />  
      <Route path="/algorithms/sorting/merge-sort" element={<MergeSortPage />} />
      <Route path="/algorithms/sorting/quick-sort" element={<QuickSortPage />} />
      <Route path="/algorithms/searching/linear-search" element={<LinearSearchPage />} />
      <Route path="/algorithms/searching/binary-search" element={<BinarySearchPage />} />    
      <Route path="/algorithms/sorting/bubble-sort" element={<BubbleSortPage />} />
      <Route path="/algorithms/graph/dijkstra" element={<DijkstraPage />} />
      <Route path="/algorithms/graph/bfs" element={<BFSPage />} />
      <Route path="/algorithms/graph/dfs" element={<DFSPage />} />
    
      </Routes>
    </BrowserRouter>
  );
}
   