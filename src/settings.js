// Creative right HAHAHAHAHA
import { drawGrid, clearGrid } from "./main";
function refresh() {
  clearGrid();
  drawGrid();
}

// References to DOM elements.
const sizeInput = document.getElementById("size");
const speedInput = document.getElementById("speed");
const diagonalBool = document.getElementById("diagonal");
const algorithmChoice = document.getElementsByName("algorithm");
const clearButton = document.getElementById("clear");
const runButton = document.getElementById("run");
const statusText = document.getElementById("text");

// Get the relevant values from the elements.
export let size = sizeInput.value;
export const speed = speedInput.value;
export const diagonal = diagonalBool.value;
export const algorithm = algorithmChoice[0].checked ? "dijkstra" : "a-star";

// Resize the grid when window is resized.
window.onresize = () => {
  refresh();
};

// Size slider.
sizeInput.addEventListener("change", () => {
  size = sizeInput.value;
  refresh();
});

// Clear button.
clearButton.addEventListener("click", refresh);

// Run button.
runButton.addEventListener("click", () => {
  statusText.innerHTML = "Mode: Running";
});
