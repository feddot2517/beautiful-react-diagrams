import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import inRange from 'lodash.inrange';
import getDiagramNodeStyle from './getDiagramNodeStyle';
import { usePortRegistration, useNodeRegistration } from '../../shared/internal_hooks/useContextRegistration';
import { PortType } from '../../shared/Types';
import portGenerator from './portGenerator';
import useDrag from '../../shared/internal_hooks/useDrag';
import useNodeUnregistration from '../../shared/internal_hooks/useNodeUnregistration';

/**
 * A Diagram Node component displays a single diagram node, handles the drag n drop business logic and fires the
 * related callback. Displays input and output ports if existing and takes care of firing the `onPortRegister` callback
 * when a port is ready (aka rendered),
 */
const DiagramNode = (props) => {
  const {
    id, content, coordinates, type, inputs, outputs, data, onPositionChange, onPortRegister, onNodeRemove,
    onDragNewSegment, onMount, onSegmentFail, onSegmentConnect, render, className, disableDrag, onSelectNode, isSelected
  } = props;
  const registerPort = usePortRegistration(inputs, outputs, onPortRegister); // get the port registration method
  const { ref, onDragStart, onDrag } = useDrag({ throttleBy: 14 }); // get the drag n drop methods
  const dragStartPoint = useRef(coordinates); // keeps the drag start point in a persistent reference

  if (!disableDrag) {
    // when drag starts, save the starting coordinates into the `dragStartPoint` ref
    onDragStart((event) => {
      dragStartPoint.current = coordinates;
      event.stopPropagation();
    });

    // whilst dragging calculates the next coordinates and perform the `onPositionChange` callback
    onDrag((event, info) => {
      if (onPositionChange) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        const nextCoords = [dragStartPoint.current[0] - info.offset[0], dragStartPoint.current[1] - info.offset[1]];
        onPositionChange(id, nextCoords);
      }
    });
  }

  // on component unmount, remove its references
  useNodeUnregistration(onNodeRemove, inputs, outputs, id);

  // perform the onMount callback when the node is allowed to register
  useNodeRegistration(ref, onMount, id);

  const classList = useMemo(() => classNames('bi bi-diagram-node', {
    [`bi-diagram-node-${type}`]: !!type && !render,
  }, className), [type, className]);

  // generate ports
  const options = { registerPort, onDragNewSegment, onSegmentFail, onSegmentConnect };
  const InputPorts = inputs.map(portGenerator(options, 'input'));
  const OutputPorts = outputs.map(portGenerator(options, 'output'));
  const customRenderProps = { id, render, content, type, inputs: InputPorts, outputs: OutputPorts, data, className };

  return (
    <div className={classList} style={{...getDiagramNodeStyle(coordinates, disableDrag), border: `3px solid ${isSelected?'#bbbbbb':'rgba(255,255,255,0)'}`}} onClick={(e)=>onSelectNode({id, content, coordinates, event: e})}>
      <div>
      <div style={
        {
          height: 20,
          textAlign: 'center',
          minWidth: 100,
          background: '#cde0e7',
          cursors: 'move',
          userSelect: 'none'
        }} ref={ref}>DRAG</div>
      {render && typeof render === 'function' && render(customRenderProps)}
      {!render && (
        <>
          {content}
          <div className="bi-port-wrapper">
            <div className="bi-input-ports">
              {InputPorts}
            </div>
            <div className="bi-output-ports">
              {OutputPorts}
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

DiagramNode.propTypes = {
  /**
   * The diagram node id
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The diagram current coordinates, relative to the container
   */
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * The diagram content
   */
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  /**
   * An array of input ports
   */
  inputs: PropTypes.arrayOf(PortType),
  /**
   * An array of output ports
   */
  outputs: PropTypes.arrayOf(PortType),
  /**
   * The node type
   */
  type: PropTypes.oneOf(['default']),
  /**
   * An object to possibly keep data between renders
   */
  data: PropTypes.shape({}),
  /**
   * Defines a custom render function
   */
  render: PropTypes.func,
  /**
   * The callback to be fired when position changes
   */
  onPositionChange: PropTypes.func,
  /**
   * The callback to be fired when a new diagram is mounted
   */
  onMount: PropTypes.func,
  /**
   * The callback to be fired when a new port is settled
   */
  onPortRegister: PropTypes.func,
  /**
   * The callback to be fired when component unmount
   */
  onNodeRemove: PropTypes.func,
  /**
   * The callback to be fired when dragging a new segment from one of the node's port
   */
  onDragNewSegment: PropTypes.func,
  /**
   * The callback to be fired when a new segment fails to connect
   */
  onSegmentFail: PropTypes.func,
  /**
   * The callback to be fired when a new segment connects to a port
   */
  onSegmentConnect: PropTypes.func,
  /**
   * The possible className
   */
  onSelectNode: PropTypes.func,
  className: PropTypes.string,
  disableDrag: PropTypes.bool,
  isSelected: PropTypes.bool,
};

DiagramNode.defaultProps = {
  type: 'default',
  content: '',
  inputs: [],
  outputs: [],
  data: {},
  onPositionChange: undefined,
  render: undefined,
  onMount: undefined,
  onPortRegister: undefined,
  onNodeRemove: undefined,
  onSelectNode: undefined,
  onDragNewSegment: undefined,
  onSegmentFail: undefined,
  onSegmentConnect: undefined,
  className: '',
  disableDrag: false,
  isSelected: false,
};

export default DiagramNode;
