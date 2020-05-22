import { size, speed, diagonal, algorithm } from "./settings";

// References to DOM elements.
const grid = document.getElementById("grid");
const statusText = document.getElementById("text");
const openOutput = document.getElementById("open");
const closedOutput = document.getElementById("closed");
const pathOutput = document.getElementById("path");

// Array to store node properties.
let nodes = [];
let sNode = null;
let eNode = null;

// Draw the grid.
drawGrid();
statusText.innerHTML = "Mode: Map Creation";

// Dependency for the control handlers.
let mouseDown = false;
let sKeyDown = false;
let eKeyDown = false;
document.addEventListener("mousedown", () => (mouseDown = true));
document.addEventListener("mouseup", () => (mouseDown = false));
document.addEventListener("keydown", (e) => {
  if (e.key == "s") sKeyDown = true;
});
document.addEventListener("keydown", (e) => {
  if (e.key == "e") eKeyDown = true;
});
document.addEventListener("keyup", () => {
  sKeyDown = false;
  eKeyDown = false;
});

// Drawing and initializing the grid and nodes.
export function drawGrid() {
  // Calculate the size of each node.
  const density = size;
  const vhRatio = window.innerWidth / window.innerHeight;
  const rows = density;
  const cols = density * vhRatio;

  // Draw a grid.
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      row.appendChild(cell);
      initializeNode(cell, i, j);
    }
    grid.appendChild(row);
  }
}

// Clearing the grid and nodes array.
export function clearGrid() {
  nodes = [];
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
}

// All the things a cell needs to be a node.
function initializeNode(cell, row, col) {
  const node = {
    cell: cell,
    row: row,
    col: col,
    state: null,
  };
  nodes.push(node);

  // Mouse click handler.
  cell.addEventListener("mousedown", () => {
    if (sKeyDown) startNode(node);
    else if (eKeyDown) endNode(node);
    else wallNode(node);
  });

  // Mouse drag handler
  cell.addEventListener("mouseenter", () => {
    if (mouseDown) wallNode(node);
  });
}

// Placing a wall event.
function wallNode(node) {
  if (node.state == null) {
    node.cell.style.backgroundColor = "#000";
    node.state = "wall";
  }
}

// Placing a start node event.
function startNode(node) {
  if (sNode != null) {
    sNode.cell.style.backgroundColor = "#fff";
    sNode.state = null;
  }
  sNode = node;
  node.cell.style.backgroundColor = "green";
  node.state = "start";
}

// Placing an end node event.
function endNode(node) {
  if (eNode != null) {
    eNode.cell.style.backgroundColor = "#fff";
    eNode.state = null;
  }
  eNode = node;
  node.cell.style.backgroundColor = "red";
  node.state = "end";
}
