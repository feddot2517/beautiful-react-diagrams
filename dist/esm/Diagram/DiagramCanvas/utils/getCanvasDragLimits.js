/* beautiful-react-diagrams version: 0.5.0 */
import { slicedToArray as _slicedToArray } from '../../../_virtual/_rollupPluginBabelHelpers.js';

var getCanvasDragLimits = function getCanvasDragLimits(canvasDim, canvasParentDim) {
  var _ref = Array.isArray(canvasDim) ? canvasDim : [0, 0],
      _ref2 = _slicedToArray(_ref, 2),
      canvasWidth = _ref2[0],
      canvasHeight = _ref2[1];

  var _ref3 = Array.isArray(canvasParentDim) ? canvasParentDim : [0, 0],
      _ref4 = _slicedToArray(_ref3, 2),
      parentWidth = _ref4[0],
      parentHeight = _ref4[1];

  var topLimit = parentHeight > 0 ? -(parentHeight / 2) : 0;
  var rightLimit = canvasWidth > 0 && parentWidth > 0 ? -canvasWidth + parentWidth / 2 : 0;
  var bottomLimit = canvasHeight > 0 && parentHeight > 0 ? -canvasHeight + parentHeight / 2 : 0;
  var leftLimit = parentWidth > 0 ? -(parentWidth / 2) : 0;
  return [topLimit, rightLimit, bottomLimit, leftLimit];
};

export default getCanvasDragLimits;
