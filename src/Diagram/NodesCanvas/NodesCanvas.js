import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { NodeType } from '../../shared/Types';
import DiagramNode from '../DiagramNode/DiagramNode';
import updateNodeCoordinates from './updateNodeCoordinates';

/**
 * Handles the nodes' events and business logic
 */
const NodesCanvas = (props) => {
  const {
    onSelectNode, nodes, onPortRegister, onNodeRegister, onNodeRemove, onDragNewSegment, onSegmentFail, onSegmentConnect, onChange,
  } = props;

  const [selectedNode, setSelectedNode] = useState('');

  // when a node item update its position updates it within the nodes array
  const onNodePositionChange = (nodeId, newCoordinates) => {
    if (onChange) {
      const nextNodes = updateNodeCoordinates(nodeId, newCoordinates, nodes);
      onChange(nextNodes);
    }
  };

  return nodes && nodes.length > 0 && nodes.map(({ data, ...node }) => (
    <DiagramNode
      {...node}
      data={data}
      onPositionChange={onNodePositionChange}
      onPortRegister={onPortRegister}
      onNodeRemove={onNodeRemove}
      onDragNewSegment={onDragNewSegment}
      onSegmentFail={onSegmentFail}
      onSegmentConnect={onSegmentConnect}
      onMount={onNodeRegister}
      isSelected={selectedNode === node.id}
      onSelectNode={(e)=>{onSelectNode(e); setSelectedNode(node.id)}}
      key={node.id}
    />
  ));
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
  onSegmentConnect: PropTypes.func,
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
  onSegmentConnect: undefined,
};

export default React.memo(NodesCanvas);
