/* beautiful-react-diagrams version: 0.5.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var Types = require('../../shared/Types.js');
var DiagramNode = require('../DiagramNode/DiagramNode.js');
var updateNodeCoordinates = require('./updateNodeCoordinates.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var NodesCanvas = function NodesCanvas(props) {
  var _onSelectNode = props.onSelectNode,
      nodes = props.nodes,
      onPortRegister = props.onPortRegister,
      onNodeRegister = props.onNodeRegister,
      onNodeRemove = props.onNodeRemove,
      onDragNewSegment = props.onDragNewSegment,
      onSegmentFail = props.onSegmentFail,
      onSegmentConnect = props.onSegmentConnect,
      onChange = props.onChange;

  var _useState = React.useState(''),
      _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
      selectedNode = _useState2[0],
      setSelectedNode = _useState2[1];

  var onNodePositionChange = function onNodePositionChange(nodeId, newCoordinates) {
    if (onChange) {
      var nextNodes = updateNodeCoordinates['default'](nodeId, newCoordinates, nodes);
      onChange(nextNodes);
    }
  };

  return nodes && nodes.length > 0 && nodes.map(function (_ref) {
    var data = _ref.data,
        node = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, ["data"]);

    return React__default['default'].createElement(DiagramNode['default'], _rollupPluginBabelHelpers['extends']({}, node, {
      data: data,
      onPositionChange: onNodePositionChange,
      onPortRegister: onPortRegister,
      onNodeRemove: onNodeRemove,
      onDragNewSegment: onDragNewSegment,
      onSegmentFail: onSegmentFail,
      onSegmentConnect: onSegmentConnect,
      onMount: onNodeRegister,
      isSelected: selectedNode === node.id,
      onSelectNode: function onSelectNode(e) {
        _onSelectNode(e);

        setSelectedNode(node.id);
      },
      key: node.id
    }));
  });
};

NodesCanvas.propTypes = {
  nodes: PropTypes__default['default'].arrayOf(Types.NodeType),
  onChange: PropTypes__default['default'].func,
  onSelectNode: PropTypes__default['default'].func,
  onNodeRegister: PropTypes__default['default'].func,
  onPortRegister: PropTypes__default['default'].func,
  onNodeRemove: PropTypes__default['default'].func,
  onDragNewSegment: PropTypes__default['default'].func,
  onSegmentFail: PropTypes__default['default'].func,
  onSegmentConnect: PropTypes__default['default'].func
};
NodesCanvas.defaultProps = {
  nodes: [],
  onChange: undefined,
  onSelectNode: undefined,
  onNodeRegister: undefined,
  onPortRegister: undefined,
  onNodeRemove: undefined,
  onDragNewSegment: undefined,
  onSegmentFail: undefined,
  onSegmentConnect: undefined
};
var NodesCanvas$1 = React__default['default'].memo(NodesCanvas);

exports.default = NodesCanvas$1;
