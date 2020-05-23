import { dijkstra } from "./dijkstra";
import { aStar } from "./a_star";

// References to DOM elements.
const grid = document.getElementById("grid");
const clearButton = document.getElementById("clear");
const runButton = document.getElementById("run");

// References to DOM elements for input.
const sizeInput = document.getElementById("size");
const speedInput = document.getElementById("speed");
const algorithmInput = document.getElementsByName("algorithm");

// References to DOM elements for output.
const statusText = document.getElementById("text");
const openOutput = document.getElementById("open");
const closedOutput = document.getElementById("closed");
const pathOutput = document.getElementById("path");

// Derived values from input.
let size = sizeInput.value;
let algorithm = algorithmInput[0].checked ? "dijkstra" : "a-star";
let speed = speedInput.value;

// Array to store node properties.
let nodes = [];
let sNode = null;
let eNode = null;

// Resize the grid when window is resized.
window.onresize = () => {
  refresh();
};

// Size slider.
sizeInput.addEventListener("change", () => {
  size = sizeInput.value;
  refresh();
});

// Speed slider.
speedInput.addEventListener("change", () => {
  speed = speedInput.value;
});

// Algorithm radios.
algorithmInput.forEach((radio) => {
  radio.addEventListener("change", () => {
    algorithm = algorithmInput[0].checked ? "dijkstra" : "a-star";
  });
});

// Clear button.
clearButton.addEventListener("click", refresh);

// Run button.
runButton.addEventListener("click", () => {
  if (sNode != null && eNode != null) {
    statusText.innerHTML = "Mode: Running...";
    let visited = [];
    switch (algorithm) {
      case "dijkstra":
        visited = dijkstra(nodes, sNode);
        break;
      case "a-star":
        visited = aStar(nodes, sNode);
        break;
      default:
        break;
    }
    // TODO: WHY THE FUCK IS VISITED UNDEFINED?!!
    // I'M LOSING MY SANITY WITH EVERY SECOND FFS
    animate(visited);
  }
});

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

// Draw the grid on start.
drawGrid();
statusText.innerHTML = "Mode: Map Creation";

// Drawing and initializing the grid and nodes.
function drawGrid() {
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
function clearGrid() {
  nodes = [];
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
}

// Two in one function.
function refresh() {
  clearGrid();
  drawGrid();
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

function animate(visited) {
  let i = 0;
  const loop = setInterval(() => {
    if (i == visited.length) clearInterval(loop);
    visited[i].cell.style.backgroundColor = "blue";
    i++;
  }, 400 / speed);
}

function backtrack(shortestPath) {}
