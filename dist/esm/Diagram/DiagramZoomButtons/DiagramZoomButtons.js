/* beautiful-react-diagrams version: 0.5.0 */
import React, { useRef, useCallback } from 'react';
import { objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getDiagramZoomButtonsPosition from './getDiagramZoomButtonsPosition.js';

var DiagramZoomButtons = function DiagramZoomButtons(props) {
  var onZoomIn = props.onZoomIn,
      onResetZoom = props.onResetZoom,
      onZoomOut = props.onZoomOut,
      disableZoomInBtn = props.disableZoomInBtn,
      disableZoomOutBtn = props.disableZoomOutBtn,
      buttonsPosition = props.buttonsPosition,
      className = props.className,
      rest = _objectWithoutProperties(props, ["onZoomIn", "onResetZoom", "onZoomOut", "disableZoomInBtn", "disableZoomOutBtn", "buttonsPosition", "className"]);

  var classList = classNames('diagram-zoom-buttons', {
    'vertical-orientation': !buttonsPosition.includes('center')
  }, className);
  var buttonsGroupRef = useRef();
  var calculateButtonsPosition = useCallback(function (position) {
    var parentElement = buttonsGroupRef.current && buttonsGroupRef.current.parentElement;
    var parentDim = parentElement && [parentElement.offsetWidth, parentElement.offsetHeight];
    var buttonsDim = buttonsGroupRef.current && [buttonsGroupRef.current.offsetWidth, buttonsGroupRef.current.offsetHeight];
    return getDiagramZoomButtonsPosition(buttonsDim, parentDim, position);
  }, [buttonsGroupRef.current]);
  return React.createElement("div", _extends({
    ref: buttonsGroupRef,
    className: classList,
    style: calculateButtonsPosition(buttonsPosition)
  }, rest), React.createElement("button", {
    type: "button",
    "aria-label": "zoom-in",
    onClick: onZoomIn,
    className: "zoom-in-btn ".concat(disableZoomInBtn ? 'disabled' : ''),
    disabled: disableZoomInBtn
  }), React.createElement("button", {
    type: "button",
    "aria-label": "zoom-reset",
    onClick: onResetZoom,
    className: "zoom-reset-btn ".concat(disableZoomOutBtn ? 'disabled' : ''),
    disabled: disableZoomOutBtn
  }), React.createElement("button", {
    type: "button",
    "aria-label": "zoom-out",
    onClick: onZoomOut,
    className: "zoom-out-btn ".concat(disableZoomOutBtn ? 'disabled' : ''),
    disabled: disableZoomOutBtn
  }));
};

DiagramZoomButtons.propTypes = {
  onZoomIn: PropTypes.func.isRequired,
  onResetZoom: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired,
  disableZoomOutBtn: PropTypes.bool,
  disableZoomInBtn: PropTypes.bool,
  buttonsPosition: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left'])
};
DiagramZoomButtons.defaultProps = {
  disableZoomOutBtn: false,
  disableZoomInBtn: false,
  buttonsPosition: 'bottom-right'
};

export default DiagramZoomButtons;
