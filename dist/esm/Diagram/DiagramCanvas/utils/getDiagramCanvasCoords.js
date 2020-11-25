/* beautiful-react-diagrams version: 0.5.0 */
var getDiagramCanvasCoords = function getDiagramCanvasCoords(left, top, scaleValue) {
  var newLeft = left || 0;
  var newTop = top || 0;
  var newScaleValue = scaleValue || 1;
  return {
    transform: "translate(".concat(newLeft, "px, ").concat(newTop, "px) scale(").concat(newScaleValue, ")")
  };
};

export default getDiagramCanvasCoords;
