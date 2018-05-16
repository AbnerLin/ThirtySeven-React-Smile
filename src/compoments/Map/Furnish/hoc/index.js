import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ToolBar from '../ToolBar';

export const withDraggable = (WrappedComponent) => {

  return class extends React.Component {

    static propTypes = {
      id: PropTypes.string.isRequired,
      x: PropTypes.string.isRequired,
      y: PropTypes.string.isRequired,
      control: PropTypes.bool.isRequired,
      onDragStop: PropTypes.func.isRequired,
      onDelete: PropTypes.func.isRequired
    }

    render() {
      return (
        <Draggable
          bounds="parent"
          axis="both"
          handle=".handle"
          onStop={
            (event, draggableData) => {
              this.props.onDragStop(event, draggableData, this.props.id);
            }
          }
          id={this.props.id}
          defaultPosition={{x: this.props.x, y: this.props.y}}>
          <WrappedComponent {...this.props}>
            { this.props.control ? <ToolBar furnishid={this.props.id} onDelete={this.props.onDelete} /> : null }
          </WrappedComponent>
        </Draggable>
      );
    }
  };

};

export const withMenuPanelTrigger = (WrappedComponent) => {

};
