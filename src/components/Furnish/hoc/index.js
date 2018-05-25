import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import ToolBar from '../ToolBar';
import { WindowReduxCreator } from 'actions/creators';

export const withDraggable = (WrappedComponent) => {

  return class extends React.Component {

    static propTypes = {
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
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
          <div className="box">
            <WrappedComponent {...this.props}>
              { this.props.control ? <ToolBar furnishid={this.props.id} onDelete={this.props.onDelete} /> : null }
            </WrappedComponent>
          </div>
        </Draggable>
      );
    }
  };

};

export const withOperationPanelTrigger = (WrappedComponent) => {

  class WithOperationPanel extends React.Component {

    constructor(props) {
      super(props);

      this.toggleOperationPanel = this.toggleOperationPanel.bind(this);
    }

    toggleOperationPanel() {
      this.props.setCurrentCustomerId(this.props.customerId);
      this.props.toggleOperationPanelModal();
    }

    render() {
      return(
        <WrappedComponent {...this.props} onClick={this.toggleOperationPanel} />
      );
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      toggleOperationPanelModal: () => {
        dispatch(WindowReduxCreator.operationPanel.toggleModal())
      },
      setCurrentCustomerId: (customerId) => {
        dispatch(WindowReduxCreator.operationPanel.setCurrentCustomerId(customerId))
      }
    };
  };

  return connect(
    null,
    mapDispatchToProps
  )(WithOperationPanel);
};
