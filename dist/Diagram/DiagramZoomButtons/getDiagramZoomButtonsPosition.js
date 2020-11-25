/* beautiful-react-diagrams version: 0.5.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');

var getDiagramZoomButtonsPosition = function getDiagramZoomButtonsPosition(buttonsDim, parentDim, position) {
  var left = 0,
      top = 0;

  if (!Array.isArray(buttonsDim) || !Array.isArray(parentDim) || buttonsDim.length !== 2 || parentDim.length !== 2) {
    return {
      transform: "translate(".concat(left, "px,").concat(top, "px)")
    };
  }

  var translateValues = {
    'bottom-right': [parentDim[0] - buttonsDim[0], parentDim[1] - buttonsDim[1]],
    'bottom-left': [0, parentDim[1] - buttonsDim[1]],
    'bottom-center': [parentDim[0] / 2 - buttonsDim[0] / 2, parentDim[1] - buttonsDim[1]],
    'top-right': [parentDim[0] - buttonsDim[0], 0],
    'top-left': [0, 0],
    'top-center': [parentDim[0] / 2 - buttonsDim[0] / 2, 0]
  };

  var _translateValues$posi = _rollupPluginBabelHelpers.slicedToArray(translateValues[position], 2);

  left = _translateValues$posi[0];
  top = _translateValues$posi[1];
  return {
    transform: "translate(".concat(left, "px,").concat(top, "px)")
  };
};

exports.default = getDiagramZoomButtonsPosition;
