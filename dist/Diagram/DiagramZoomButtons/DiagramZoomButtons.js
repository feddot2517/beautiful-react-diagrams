/* beautiful-react-diagrams version: 0.5.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var classNames = require('classnames');
var PropTypes = require('prop-types');
var getDiagramZoomButtonsPosition = require('./getDiagramZoomButtonsPosition.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var DiagramZoomButtons = function DiagramZoomButtons(props) {
  var onZoomIn = props.onZoomIn,
      onResetZoom = props.onResetZoom,
      onZoomOut = props.onZoomOut,
      disableZoomInBtn = props.disableZoomInBtn,
      disableZoomOutBtn = props.disableZoomOutBtn,
      buttonsPosition = props.buttonsPosition,
      className = props.className,
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(props, ["onZoomIn", "onResetZoom", "onZoomOut", "disableZoomInBtn", "disableZoomOutBtn", "buttonsPosition", "className"]);

  var classList = classNames__default['default']('diagram-zoom-buttons', {
    'vertical-orientation': !buttonsPosition.includes('center')
  }, className);
  var buttonsGroupRef = React.useRef();
  var calculateButtonsPosition = React.useCallback(function (position) {
    var parentElement = buttonsGroupRef.current && buttonsGroupRef.current.parentElement;
    var parentDim = parentElement && [parentElement.offsetWidth, parentElement.offsetHeight];
    var buttonsDim = buttonsGroupRef.current && [buttonsGroupRef.current.offsetWidth, buttonsGroupRef.current.offsetHeight];
    return getDiagramZoomButtonsPosition['default'](buttonsDim, parentDim, position);
  }, [buttonsGroupRef.current]);
  return React__default['default'].createElement("div", _rollupPluginBabelHelpers['extends']({
    ref: buttonsGroupRef,
    className: classList,
    style: calculateButtonsPosition(buttonsPosition)
  }, rest), React__default['default'].createElement("button", {
    type: "button",
    "aria-label": "zoom-in",
    onClick: onZoomIn,
    className: "zoom-in-btn ".concat(disableZoomInBtn ? 'disabled' : ''),
    disabled: disableZoomInBtn
  }), React__default['default'].createElement("button", {
    type: "button",
    "aria-label": "zoom-reset",
    onClick: onResetZoom,
    className: "zoom-reset-btn ".concat(disableZoomOutBtn ? 'disabled' : ''),
    disabled: disableZoomOutBtn
  }), React__default['default'].createElement("button", {
    type: "button",
    "aria-label": "zoom-out",
    onClick: onZoomOut,
    className: "zoom-out-btn ".concat(disableZoomOutBtn ? 'disabled' : ''),
    disabled: disableZoomOutBtn
  }));
};

DiagramZoomButtons.propTypes = {
  onZoomIn: PropTypes__default['default'].func.isRequired,
  onResetZoom: PropTypes__default['default'].func.isRequired,
  onZoomOut: PropTypes__default['default'].func.isRequired,
  disableZoomOutBtn: PropTypes__default['default'].bool,
  disableZoomInBtn: PropTypes__default['default'].bool,
  buttonsPosition: PropTypes__default['default'].oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left'])
};
DiagramZoomButtons.defaultProps = {
  disableZoomOutBtn: false,
  disableZoomInBtn: false,
  buttonsPosition: 'bottom-right'
};

exports.default = DiagramZoomButtons;
