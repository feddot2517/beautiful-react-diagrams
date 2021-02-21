/* beautiful-react-diagrams version: 0.5.0 */
import { slicedToArray as _slicedToArray } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useState } from 'react';

function useForceUpdate() {
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2);
      _useState2[0];
      var setValue = _useState2[1];

  return function () {
    return setValue(function (value) {
      return ++value;
    });
  };
}

export { useForceUpdate };
