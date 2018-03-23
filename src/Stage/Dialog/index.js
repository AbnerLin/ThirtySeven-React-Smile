import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './index.css';

class Dialog extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      modalShow: true
    };

    this.toggle = this.toggle.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  toggle() {
    this.setState({
      modalShow: !this.state.modalShow
    }, () => {
      this.props.toggle();
    });
  }

  confirm() {
    this.props.confirm();
    this.props.toggle();
  }

  cancel() {
    this.props.cancel();
    this.props.toggle();
  }

  render() {
    const buttonGroup = this.props.yesOrNo ? (
      <div>
        <Button color="success" onClick={this.confirm}>ok</Button>
        <Button color="secondary" onClick={this.cancel}>cancel</Button>
      </div>
    ) : (
      <div>
        <Button color="secondary" onClick={this.cancel}>cancel</Button>
      </div>
    );

    return (
      <div>
        <Modal isOpen={this.state.modalShow} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>{this.props.content}</ModalBody>
          <ModalFooter>
            {buttonGroup}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Dialog;