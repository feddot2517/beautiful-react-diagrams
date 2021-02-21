/* beautiful-react-diagrams version: 0.5.0 */
import { slicedToArray as _slicedToArray, objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NodeType } from '../../shared/Types.js';
import DiagramNode from '../DiagramNode/DiagramNode.js';
import updateNodeCoordinates from './updateNodeCoordinates.js';

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

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      selectedNode = _useState2[0],
      setSelectedNode = _useState2[1];

  var onNodePositionChange = function onNodePositionChange(nodeId, newCoordinates) {
    if (onChange) {
      var nextNodes = updateNodeCoordinates(nodeId, newCoordinates, nodes);
      onChange(nextNodes);
    }
  };

  return nodes && nodes.length > 0 && nodes.map(function (_ref) {
    var data = _ref.data,
        node = _objectWithoutProperties(_ref, ["data"]);

    return React.createElement(DiagramNode, _extends({}, node, {
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
  nodes: PropTypes.arrayOf(NodeType),
  onChange: PropTypes.func,
  onSelectNode: PropTypes.func,
  onNodeRegister: PropTypes.func,
  onPortRegister: PropTypes.func,
  onNodeRemove: PropTypes.func,
  onDragNewSegment: PropTypes.func,
  onSegmentFail: PropTypes.func,
  onSegmentConnect: PropTypes.func
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
var NodesCanvas$1 = React.memo(NodesCanvas);

export default NodesCanvas$1;
