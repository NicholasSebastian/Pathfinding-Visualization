import { drawGrid, clearGrid } from "./main";

// References to DOM elements.
const sizeInput = document.getElementById("size");
const speedInput = document.getElementById("speed");
const diagonalBool = document.getElementById("diagonal");
const algorithmChoice = document.getElementsByName("algorithm");
const clearButton = document.getElementById("clear");
const runButton = document.getElementById("run");

// Get the relevant values from the elements.
export let size = sizeInput.value;
export let speed = speedInput.value;
export let diagonal = diagonalBool.value;
export let algorithm = algorithmChoice[0].checked ? "dijkstra" : "a-star";

// Size slider.
sizeInput.addEventListener("change", () => {
  size = sizeInput.value;
  clearGrid();
  drawGrid();
});

// Clear button.
clearButton.addEventListener("click", () => {
  clearGrid();
  drawGrid();
});
