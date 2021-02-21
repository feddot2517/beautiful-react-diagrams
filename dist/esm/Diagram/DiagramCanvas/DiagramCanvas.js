/* beautiful-react-diagrams version: 0.5.0 */
import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, objectSpread2 as _objectSpread2, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMouseEvents, useWindowScroll, useWindowResize } from 'beautiful-react-hooks';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DiagramContext from '../../Context/DiagramContext.js';
import getDiagramCanvasCoords from './utils/getDiagramCanvasCoords.js';
import getCanvasDragLimits from './utils/getCanvasDragLimits.js';
import DiagramZoomButtons from '../DiagramZoomButtons/DiagramZoomButtons.js';

var DiagramCanvas = function DiagramCanvas(props) {
  var children = props.children,
      portRefs = props.portRefs,
      nodeRefs = props.nodeRefs,
      draggable = props.draggable,
      delta = props.delta,
      zoomButtonsPosition = props.zoomButtonsPosition,
      showZoomButtons = props.showZoomButtons,
      maxZoom = props.maxZoom,
      minZoom = props.minZoom,
      zoomOnWheel = props.zoomOnWheel,
      className = props.className,
      style = props.style,
      onClick = props.onClick,
      rest = _objectWithoutProperties(props, ["children", "portRefs", "nodeRefs", "draggable", "delta", "zoomButtonsPosition", "showZoomButtons", "maxZoom", "minZoom", "zoomOnWheel", "className", "style", "onClick"]);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      bbox = _useState2[0],
      setBoundingBox = _useState2[1];

  var canvasRef = useRef();
  var mouseCoords = useRef();

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isDragging = _useState4[0],
      setIsDragging = _useState4[1];

  var _useMouseEvents = useMouseEvents(canvasRef),
      onMouseDown = _useMouseEvents.onMouseDown,
      onMouseMove = _useMouseEvents.onMouseMove,
      onMouseUp = _useMouseEvents.onMouseUp,
      onMouseLeave = _useMouseEvents.onMouseLeave;

  var _useState5 = useState([0, 0]),
      _useState6 = _slicedToArray(_useState5, 2),
      canvasTranslate = _useState6[0],
      setCanvasTranslate = _useState6[1];

  var _useState7 = useState(1),
      _useState8 = _slicedToArray(_useState7, 2),
      canvasScale = _useState8[0],
      setCanvasScale = _useState8[1];

  var classList = classNames('bi bi-diagram-canvas', {
    'enlarge-diagram-canvas': draggable || showZoomButtons || zoomOnWheel
  }, className);
  var wrapperClassList = classNames('bi bi-diagram', {
    isPanning: isDragging,
    pannable: draggable || showZoomButtons || zoomOnWheel
  });

  var calculateBBox = function calculateBBox(el) {
    if (el) {
      var nextBBox = el.getBoundingClientRect();

      if (!isEqual(nextBBox, bbox)) {
        setBoundingBox(nextBBox);
      }
    }
  };

  useEffect(function () {
    calculateBBox(canvasRef.current);

    if (draggable || showZoomButtons || zoomOnWheel) {
      var canvasBBox = canvasRef.current.getBoundingClientRect();
      setCanvasTranslate([-(canvasBBox.width / 2), -(canvasBBox.height / 2)]);
    }
  }, [canvasRef.current]);
  useWindowScroll(function () {
    return calculateBBox(canvasRef.current);
  });
  useWindowResize(function () {
    return calculateBBox(canvasRef.current);
  });
  onMouseDown(function (event) {
    if (draggable) {
      mouseCoords.current = [event.pageX, event.pageY];
      setIsDragging(true);
    }
  });
  onMouseMove(function (event) {
    if (draggable && isDragging) {
      var currentMouseCoords = [event.pageX, event.pageY];
      var deltaXMouse = currentMouseCoords[0] - mouseCoords.current[0];
      var deltaYMouse = currentMouseCoords[1] - mouseCoords.current[1];
      var canvasParent = canvasRef.current.parentElement;
      var canvasParentDim = [canvasParent.offsetWidth, canvasParent.offsetHeight];
      var canvasDim = [canvasRef.current.offsetWidth, canvasRef.current.offsetHeight];

      var _getCanvasDragLimits = getCanvasDragLimits(canvasDim, canvasParentDim),
          _getCanvasDragLimits2 = _slicedToArray(_getCanvasDragLimits, 4),
          topLimit = _getCanvasDragLimits2[0],
          rightLimit = _getCanvasDragLimits2[1],
          bottomLimit = _getCanvasDragLimits2[2],
          leftLimit = _getCanvasDragLimits2[3];

      if (deltaXMouse > delta && canvasTranslate[0] <= leftLimit) {
        setCanvasTranslate([canvasTranslate[0] + deltaXMouse, canvasTranslate[1]]);
        mouseCoords.current = [currentMouseCoords[0], mouseCoords.current[1]];
      }

      if (deltaXMouse < -delta && canvasTranslate[0] >= rightLimit) {
        setCanvasTranslate([canvasTranslate[0] + deltaXMouse, canvasTranslate[1]]);
        mouseCoords.current = [currentMouseCoords[0], mouseCoords.current[1]];
      }

      if (deltaYMouse > delta && canvasTranslate[1] <= topLimit) {
        setCanvasTranslate([canvasTranslate[0], canvasTranslate[1] + deltaYMouse]);
        mouseCoords.current = [mouseCoords.current[0], currentMouseCoords[1]];
      }

      if (deltaYMouse < -delta && canvasTranslate[1] >= bottomLimit) {
        setCanvasTranslate([canvasTranslate[0], canvasTranslate[1] + deltaYMouse]);
        mouseCoords.current = [mouseCoords.current[0], currentMouseCoords[1]];
      }
    }
  });
  var stopDragging = useCallback(function () {
    if (draggable) {
      setIsDragging(false);
      mouseCoords.current = [];
    }
  }, [draggable, setIsDragging]);
  onMouseUp(stopDragging);
  onMouseLeave(stopDragging);
  var zoomInHandler = useCallback(function () {
    if (canvasScale <= maxZoom) {
      setCanvasScale(canvasScale + 0.1);
    }
  }, [canvasScale, setCanvasScale, maxZoom]);
  var resetZoomHandler = useCallback(function () {
    setCanvasScale(1);
  }, [setCanvasScale]);
  var zoomOutHandler = useCallback(function () {
    if (canvasScale > minZoom) {
      setCanvasScale(canvasScale - 0.1);
    }
  }, [canvasScale, setCanvasScale, minZoom]);
  var zoomOnWheelHandler = useCallback(function (event) {
    event.preventDefault();

    if (event.deltaY > 0) {
      zoomInHandler();
    } else {
      zoomOutHandler();
    }
  }, [zoomOutHandler, zoomInHandler]);
  var getDiagramStyle = useCallback(function () {
    if (draggable || showZoomButtons || zoomOnWheel) {
      return _objectSpread2(_objectSpread2({}, style), getDiagramCanvasCoords(canvasTranslate[0], canvasTranslate[1], canvasScale));
    }

    return _objectSpread2({}, style);
  }, [draggable, showZoomButtons, zoomOnWheel, canvasTranslate[0], canvasTranslate[1], canvasScale]);
  return React.createElement("div", {
    className: wrapperClassList
  }, showZoomButtons && React.createElement(DiagramZoomButtons, {
    onZoomIn: zoomInHandler,
    onResetZoom: resetZoomHandler,
    onZoomOut: zoomOutHandler,
    disableZoomOutBtn: canvasScale <= minZoom,
    disableZoomInBtn: canvasScale >= maxZoom,
    buttonsPosition: zoomButtonsPosition
  }), React.createElement("div", _extends({
    onClick: onClick,
    className: classList,
    ref: canvasRef,
    style: getDiagramStyle(),
    onWheel: zoomOnWheel ? zoomOnWheelHandler : undefined
  }, rest), React.createElement(DiagramContext.Provider, {
    value: {
      canvas: bbox,
      ports: portRefs,
      nodes: nodeRefs,
      _nodes: {}
    }
  }, children)));
};

DiagramCanvas.propTypes = {
  portRefs: PropTypes.shape({}),
  nodeRefs: PropTypes.shape({}),
  draggable: PropTypes.bool,
  delta: PropTypes.number,
  showZoomButtons: PropTypes.bool,
  zoomOnWheel: PropTypes.bool,
  zoomButtonsPosition: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left']),
  className: PropTypes.string,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  onClick: PropTypes.func
};
DiagramCanvas.defaultProps = {
  portRefs: {},
  nodeRefs: {},
  className: '',
  draggable: false,
  delta: 5,
  showZoomButtons: false,
  zoomOnWheel: false,
  zoomButtonsPosition: 'bottom-right',
  minZoom: 1,
  maxZoom: 100,
  onClick: undefined
};
var DiagramCanvas$1 = React.memo(DiagramCanvas);

export default DiagramCanvas$1;
