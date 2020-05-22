import { speed } from "./main";

// Main algorithm.
const dijkstra = function (nodes, start, end) {
  start.distance = 0;
  let neighbours = nodes.filter((node) => isNeighbour(node, start));
  neighbours.forEach((node) => {
    node.cell.style.backgroundColor = "blue";
  });
};

// Check if the given node is a neighbour of self.
function isNeighbour(node, self) {
  const { row, col } = self;

  const withDiagonal =
    Math.abs(node.row - row) <= 1 &&
    Math.abs(node.col - col) <= 1 &&
    !(node.row == row && node.col == col);

  const withoutDiagonal =
    (Math.abs(node.row - row) == 1 && node.col - col == 0) ||
    (Math.abs(node.col - col) == 1 && node.row - row == 0);

  // TODO: FIX THIS VALUE RETURNING TRUE ALL THE TIME
  return document.getElementById("diagonal").value
    ? withDiagonal
    : withoutDiagonal;
}

export default dijkstra;
