export function dijkstra(nodes, source) {
  nodes.forEach((node) => (node.distance = Infinity));
  source.distance = 0;

  let visited = [];
  let queue = nodes;

  while (queue.length > 0) {
    sortByShortestDistance(queue);
    let node = queue.shift();

    if (node.state == "wall") continue; // Wall, skip.
    if (node.distance == Infinity) return visited; // Trapped, stop.

    node.state = "visited";
    visited.push(node);

    if (node.state == "end") return visited; // Target found, stop.

    for (let neighbour of getNeighbours(nodes, node)) {
      neighbour.distance = node.distance + 1;
      neighbour.prevNode = node; // For backtracking later.
    }
  }
}

function sortByShortestDistance(nodes) {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getNeighbours(nodes, source) {
  return nodes.filter(
    (node) => isNeighbour(node, source) && node.state != "visited"
  );
}

function isNeighbour(node, source) {
  const { row, col } = source;

  return (
    (Math.abs(node.row - row) == 1 && node.col - col == 0) ||
    (Math.abs(node.col - col) == 1 && node.row - row == 0)
  );
}
