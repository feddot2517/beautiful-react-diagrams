/* beautiful-react-diagrams version: 0.5.0 */
import { defineProperty as _defineProperty, objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'lodash.inrange';
import getDiagramNodeStyle from './getDiagramNodeStyle.js';
import { usePortRegistration, useNodeRegistration } from '../../shared/internal_hooks/useContextRegistration.js';
import { PortType } from '../../shared/Types.js';
import portGenerator from './portGenerator.js';
import useDrag from '../../shared/internal_hooks/useDrag.js';
import useNodeUnregistration from '../../shared/internal_hooks/useNodeUnregistration.js';

var DiagramNode = function DiagramNode(props) {
  var id = props.id,
      content = props.content,
      coordinates = props.coordinates,
      type = props.type,
      inputs = props.inputs,
      outputs = props.outputs,
      data = props.data,
      onPositionChange = props.onPositionChange,
      onPortRegister = props.onPortRegister,
      onNodeRemove = props.onNodeRemove,
      onDragNewSegment = props.onDragNewSegment,
      onMount = props.onMount,
      onSegmentFail = props.onSegmentFail,
      onSegmentConnect = props.onSegmentConnect,
      render = props.render,
      className = props.className,
      disableDrag = props.disableDrag,
      onSelectNode = props.onSelectNode,
      isSelected = props.isSelected;
  var registerPort = usePortRegistration(inputs, outputs, onPortRegister);

  var _useDrag = useDrag({
    throttleBy: 14
  }),
      ref = _useDrag.ref,
      onDragStart = _useDrag.onDragStart,
      onDrag = _useDrag.onDrag;

  var dragStartPoint = useRef(coordinates);

  if (!disableDrag) {
    onDragStart(function (event) {
      dragStartPoint.current = coordinates;
      event.stopPropagation();
    });
    onDrag(function (event, info) {
      if (onPositionChange) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        var nextCoords = [dragStartPoint.current[0] - info.offset[0], dragStartPoint.current[1] - info.offset[1]];
        onPositionChange(id, nextCoords);
      }
    });
  }

  useNodeUnregistration(onNodeRemove, inputs, outputs, id);
  useNodeRegistration(ref, onMount, id);
  var classList = useMemo(function () {
    return classNames('bi bi-diagram-node', _defineProperty({}, "bi-diagram-node-".concat(type), !!type && !render), className);
  }, [type, className]);
  var options = {
    registerPort: registerPort,
    onDragNewSegment: onDragNewSegment,
    onSegmentFail: onSegmentFail,
    onSegmentConnect: onSegmentConnect
  };
  var InputPorts = inputs.map(portGenerator(options, 'input'));
  var OutputPorts = outputs.map(portGenerator(options, 'output'));
  var customRenderProps = {
    id: id,
    render: render,
    content: content,
    type: type,
    inputs: InputPorts,
    outputs: OutputPorts,
    data: data,
    className: className
  };
  return React.createElement("div", {
    className: classList,
    style: _objectSpread2(_objectSpread2({}, getDiagramNodeStyle(coordinates)), {}, {
      border: "3px solid ".concat(isSelected ? '#bbbbbb' : 'rgba(255,255,255,0)')
    }),
    onClick: function onClick(e) {
      return onSelectNode({
        id: id,
        content: content,
        coordinates: coordinates,
        event: e
      });
    }
  }, React.createElement("div", null, React.createElement("div", {
    style: {
      height: 20,
      textAlign: 'center',
      minWidth: 100,
      background: '#cde0e7',
      cursors: 'move',
      userSelect: 'none'
    },
    ref: ref
  }, "DRAG"), render && typeof render === 'function' && render(customRenderProps), !render && React.createElement(React.Fragment, null, content, React.createElement("div", {
    className: "bi-port-wrapper"
  }, React.createElement("div", {
    className: "bi-input-ports"
  }, InputPorts), React.createElement("div", {
    className: "bi-output-ports"
  }, OutputPorts)))));
};

DiagramNode.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  inputs: PropTypes.arrayOf(PortType),
  outputs: PropTypes.arrayOf(PortType),
  type: PropTypes.oneOf(['default']),
  data: PropTypes.shape({}),
  render: PropTypes.func,
  onPositionChange: PropTypes.func,
  onMount: PropTypes.func,
  onPortRegister: PropTypes.func,
  onNodeRemove: PropTypes.func,
  onDragNewSegment: PropTypes.func,
  onSegmentFail: PropTypes.func,
  onSegmentConnect: PropTypes.func,
  onSelectNode: PropTypes.func,
  className: PropTypes.string,
  disableDrag: PropTypes.bool,
  isSelected: PropTypes.bool
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
  isSelected: false
};

export default DiagramNode;
