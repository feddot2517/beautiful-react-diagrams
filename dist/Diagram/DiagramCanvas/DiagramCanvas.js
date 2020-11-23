/* beautiful-react-diagrams version: 0.5.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var DiagramContext = require('../../Context/DiagramContext.js');
var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var PropTypes = require('prop-types');
var beautifulReactHooks = require('beautiful-react-hooks');
var isEqual = require('lodash.isequal');
var classNames = require('classnames');
var getDiagramCanvasCoords = require('./utils/getDiagramCanvasCoords.js');
var getCanvasDragLimits = require('./utils/getCanvasDragLimits.js');
var DiagramZoomButtons = require('../DiagramZoomButtons/DiagramZoomButtons.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

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
      rest = _rollupPluginBabelHelpers.objectWithoutProperties(props, ["children", "portRefs", "nodeRefs", "draggable", "delta", "zoomButtonsPosition", "showZoomButtons", "maxZoom", "minZoom", "zoomOnWheel", "className", "style"]);

  var _useState = React.useState(null),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      bbox = _useState2[0],
      setBoundingBox = _useState2[1];

  var canvasRef = React.useRef();
  var mouseCoords = React.useRef();

  var _useState3 = React.useState(false),
      _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
      isDragging = _useState4[0],
      setIsDragging = _useState4[1];

  var _useMouseEvents = beautifulReactHooks.useMouseEvents(canvasRef),
      onMouseDown = _useMouseEvents.onMouseDown,
      onMouseMove = _useMouseEvents.onMouseMove,
      onMouseUp = _useMouseEvents.onMouseUp,
      onMouseLeave = _useMouseEvents.onMouseLeave;

  var _useState5 = React.useState([0, 0]),
      _useState6 = _rollupPluginBabelHelpers.slicedToArray(_useState5, 2),
      canvasTranslate = _useState6[0],
      setCanvasTranslate = _useState6[1];

  var _useState7 = React.useState(1),
      _useState8 = _rollupPluginBabelHelpers.slicedToArray(_useState7, 2),
      canvasScale = _useState8[0],
      setCanvasScale = _useState8[1];

  var classList = classNames__default['default']('bi bi-diagram-canvas', {
    'enlarge-diagram-canvas': draggable || showZoomButtons || zoomOnWheel
  }, className);
  var wrapperClassList = classNames__default['default']('bi bi-diagram', {
    isPanning: isDragging,
    pannable: draggable || showZoomButtons || zoomOnWheel
  });

  var calculateBBox = function calculateBBox(el) {
    if (el) {
      var nextBBox = el.getBoundingClientRect();

      if (!isEqual__default['default'](nextBBox, bbox)) {
        setBoundingBox(nextBBox);
      }
    }
  };

  React.useEffect(function () {
    calculateBBox(canvasRef.current);

    if (draggable || showZoomButtons || zoomOnWheel) {
      var canvasBBox = canvasRef.current.getBoundingClientRect();
      setCanvasTranslate([-(canvasBBox.width / 2), -(canvasBBox.height / 2)]);
    }
  }, [canvasRef.current]);
  beautifulReactHooks.useWindowScroll(function () {
    return calculateBBox(canvasRef.current);
  });
  beautifulReactHooks.useWindowResize(function () {
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

      var _getCanvasDragLimits = getCanvasDragLimits['default'](canvasDim, canvasParentDim),
          _getCanvasDragLimits2 = _rollupPluginBabelHelpers.slicedToArray(_getCanvasDragLimits, 4),
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
  var stopDragging = React.useCallback(function () {
    if (draggable) {
      setIsDragging(false);
      mouseCoords.current = [];
    }
  }, [draggable, setIsDragging]);
  onMouseUp(stopDragging);
  onMouseLeave(stopDragging);
  var zoomInHandler = React.useCallback(function () {
    if (canvasScale <= maxZoom) {
      setCanvasScale(canvasScale + 0.1);
    }
  }, [canvasScale, setCanvasScale, maxZoom]);
  var resetZoomHandler = React.useCallback(function () {
    setCanvasScale(1);
  }, [setCanvasScale]);
  var zoomOutHandler = React.useCallback(function () {
    if (canvasScale > minZoom) {
      setCanvasScale(canvasScale - 0.1);
    }
  }, [canvasScale, setCanvasScale, minZoom]);
  var zoomOnWheelHandler = React.useCallback(function (event) {
    event.preventDefault();

    if (event.deltaY > 0) {
      zoomInHandler();
    } else {
      zoomOutHandler();
    }
  }, [zoomOutHandler, zoomInHandler]);
  var getDiagramStyle = React.useCallback(function () {
    if (draggable || showZoomButtons || zoomOnWheel) {
      return _rollupPluginBabelHelpers.objectSpread2(_rollupPluginBabelHelpers.objectSpread2({}, style), getDiagramCanvasCoords['default'](canvasTranslate[0], canvasTranslate[1], canvasScale));
    }

    return _rollupPluginBabelHelpers.objectSpread2({}, style);
  }, [draggable, showZoomButtons, zoomOnWheel, canvasTranslate[0], canvasTranslate[1], canvasScale]);
  return React__default['default'].createElement("div", {
    className: wrapperClassList
  }, showZoomButtons && React__default['default'].createElement(DiagramZoomButtons['default'], {
    onZoomIn: zoomInHandler,
    onResetZoom: resetZoomHandler,
    onZoomOut: zoomOutHandler,
    disableZoomOutBtn: canvasScale <= minZoom,
    disableZoomInBtn: canvasScale >= maxZoom,
    buttonsPosition: zoomButtonsPosition
  }), React__default['default'].createElement("div", _rollupPluginBabelHelpers['extends']({
    className: classList,
    ref: canvasRef,
    style: getDiagramStyle(),
    onWheel: zoomOnWheel ? zoomOnWheelHandler : undefined
  }, rest), React__default['default'].createElement(DiagramContext['default'].Provider, {
    value: {
      canvas: bbox,
      ports: portRefs,
      nodes: nodeRefs,
      _nodes: {}
    }
  }, children)));
};

DiagramCanvas.propTypes = {
  portRefs: PropTypes__default['default'].shape({}),
  nodeRefs: PropTypes__default['default'].shape({}),
  draggable: PropTypes__default['default'].bool,
  delta: PropTypes__default['default'].number,
  showZoomButtons: PropTypes__default['default'].bool,
  zoomOnWheel: PropTypes__default['default'].bool,
  zoomButtonsPosition: PropTypes__default['default'].oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left']),
  className: PropTypes__default['default'].string,
  minZoom: PropTypes__default['default'].number,
  maxZoom: PropTypes__default['default'].number
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
  maxZoom: 100
};
var DiagramCanvas$1 = React__default['default'].memo(DiagramCanvas);

exports.default = DiagramCanvas$1;
