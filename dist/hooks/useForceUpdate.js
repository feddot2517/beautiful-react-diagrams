/* beautiful-react-diagrams version: 0.5.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');

function useForceUpdate() {
  var _useState = React.useState(0),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  return function () {
    return setValue(function (value) {
      return ++value;
    });
  };
}

exports.useForceUpdate = useForceUpdate;
