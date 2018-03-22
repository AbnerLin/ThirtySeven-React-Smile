import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Dialog extends React Component {
  
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modalShow: !this.state.modalShow
    });
  }

  render() {
    const buttonGroup = this.props.yesOrNo ? (
      <Button color="success">ok</Button>
      <Button color="secondary" onClick={this.toggle}>cancel</Button>
    ) : (
      <Button color="secondary" onClick={this.toggle}>cancel</Button>
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

export default Tooltip;