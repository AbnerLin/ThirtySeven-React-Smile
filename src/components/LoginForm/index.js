import React from 'react';
import { ThirtySeven } from 'common-utils';
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Alert, InputGroup, InputGroupAddon } from 'reactstrap';
import { AuthReduxCreator, WindowReduxCreator } from 'actions/creators';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class LoginForm extends React.Component {

  static propTypes = {
    loginSucceed: PropTypes.func,
    force: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      force: this.props.force, // force login, the modal will not dismiss if true.
      // modalShow: this.props.modalShow,
      btnDisabled: true,
      errorMsg: null
    }

    this.toggle = this.toggle.bind(this);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     modalShow: nextProps.modalShow
  //   });
  // }

  toggle() {
    if (this.state.force) {
       this.setState({
        errorMsg: 'Must login first.'
      });
    } else {
      this.props.toggleModal();
    }
  }

  handleChange(event) {
    let _btnDisabled = this.state.btnDisabled;

    if(this.accountInput.value !== '' && this.passwordInput.value !== '') {
      _btnDisabled = false;
    } else {
        _btnDisabled = true;
    }

    this.setState({
        btnDisabled: _btnDisabled
    });
  }

  login(event) {
    event.preventDefault();
    ThirtySeven.ajax.post('auth/login', {
        username: this.accountInput.value,
        password: this.passwordInput.value
    }).then(res => {
      if (!res._status) {
        this.setState({
            errorMsg: res._msg
        });
      } else {
        this.props.loginSucceed(res._data);
        this.props.toggleModal();
        this.setState({
          errorMsg: null
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalShow} toggle={this.toggle} className="modal-lg modal-dialog-centered">
            <ModalHeader toggle={this.toggle}>{''}</ModalHeader>
            <ModalBody className="mt-4">
              <div className="container-fluid">
                <div className="row d-flex justify-content-center h-100">
                  <div className="col-12 col-sm-6 d-flex align-items-sm-center align-items-end justify-content-center justify-content-sm-end">
                    <h1>ThirtySeven</h1>
                  </div>
                  <div className="col-12 col-sm-6 d-flex align-items-sm-center align-items-start justify-content-center justify-content-sm-start">
                    <Form id="LoginForm">
                      <FormGroup className="mb-2 mr-sm-2 col-12">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">帳號</InputGroupAddon>
                          <input className="form-control"
                            type="text"
                            name="account"
                            ref={(input) => this.accountInput = input}
                            onChange={this.handleChange} />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 col-12">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">密碼</InputGroupAddon>
                          <input className="form-control"
                            type="password"
                            name="password"
                            ref={(input) => this.passwordInput = input}
                            onChange={this.handleChange} />
                        </InputGroup>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
              </div>
              <div>
                <Alert isOpen={this.state.errorMsg ? true : false} color="danger" className="alertMsg text-center mb-0 col-6 mt-3">
                  {this.state.errorMsg}
                </Alert>
              </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="LoginForm"
              color="primary"
              onClick={this.login}
              disabled={this.state.btnDisabled}>登入</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalShow: state.window.loginForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginSucceed: userInfo => {
      dispatch(AuthReduxCreator.setAuth(userInfo));
      // dispatch(WindowReduxCreator.login.hideModal());
    },
    // hideModal: () => {
    //   dispatch(WindowReduxCreator.login.hideModal());
    // }
    toggleModal: () => {
      dispatch(WindowReduxCreator.login.toggleModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
