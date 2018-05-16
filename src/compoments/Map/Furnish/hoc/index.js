import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ToolBar from '../ToolBar';

export const withDraggable = (WrappedComponent, name, furnishclass) => {

  return class extends React.Component {

    static propTypes = {
      id: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
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
          <WrappedComponent name={name} type={furnishclass}>
            { this.props.control ? <ToolBar furnishid={this.props.id} onDelete={this.props.onDelete} /> : null }
          </WrappedComponent>
        </Draggable>
      );
    }
  };

};

export const withMenuPanelTrigger = (WrappedComponent) => {

};
