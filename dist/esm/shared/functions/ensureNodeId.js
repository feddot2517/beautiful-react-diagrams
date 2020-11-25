/* beautiful-react-diagrams version: 0.5.0 */
var ensureNodeId = function ensureNodeId(node) {
  node.id || (node.id = "node-".concat(Math.random().toString(36).substr(2, 9)));
  return node;
};

export default ensureNodeId;
