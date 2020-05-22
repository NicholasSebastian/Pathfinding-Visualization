import { drawGrid, clearGrid } from "./main";
const sizeInput = document.getElementById("size");
const clearButton = document.getElementById("clear");

// Size slider.
export let size = sizeInput.value;
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
