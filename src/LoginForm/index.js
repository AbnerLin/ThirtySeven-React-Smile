import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Alert } from 'reactstrap';

import ThirtySeven from '../CommonUtils/ThirtySeven.js';
import App from '../App';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: true,
            account: '',
            password: '',
            btnDisabled: true,
            errorMsg: null
        }

        this.toggle = this.toggle.bind(this);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggle() {
        this.setState({
          modalShow: !this.state.modalShow
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            var _btnDisabled = this.state.btnDisabled;
            if (this.state.account !== '' && this.state.password !== '') {
                _btnDisabled = false;
            } else {
                _btnDisabled = true;
            }
            this.setState({
                btnDisabled: _btnDisabled
            });
        });
    }

    login(event) {
        event.preventDefault();
        ThirtySeven.ajax("LoginForm-Modal").post('auth/login', {
            username: this.state.account,
            password: this.state.password
        }).then(res => {
            if (!res._status) {
                this.setState({
                    errorMsg: res._msg
                });
            } else {
                ReactDOM.render( <App /> , document.getElementById('root'));
            }
        });
    }

    render() {
        return (
            <div>
              <Modal isOpen={this.state.modalShow} toggle={this.toggle} id="LoginForm-Modal" className="modal-lg modal-dialog-centered">
                  <ModalHeader toggle={this.toggle}>{''}</ModalHeader>
                    <ModalBody>
                      <div className="container-fluid">
                          <div className="row d-flex justify-content-center h-100">
                              <div className="col-12 col-sm-6 d-flex align-items-sm-center align-items-end justify-content-center justify-content-sm-end">
                                <h1>ThirtySeven</h1>
                              </div>
                              <div className="col-12 col-sm-6 d-flex align-items-sm-center align-items-start justify-content-center justify-content-sm-start">
                                  <Form id="LoginForm">
                                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col-12">
                                          <Label for="account" className="mr-sm-2">帳號</Label>
                                          <Input 
                                              type="text" 
                                              name="account" 
                                              value={this.state.account} 
                                              onChange={this.handleChange} />
                                      </FormGroup>
                                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col-12">
                                          <Label for="password" className="mr-sm-2">密碼</Label>
                                          <Input 
                                              type="password" 
                                              name="password" 
                                              value={this.state.password} 
                                              onChange={this.handleChange} />
                                      </FormGroup>
                                  </Form>
                              </div>
                          </div>
                      </div>
                          <Alert isOpen={this.state.errorMsg ? true : false} color="danger" className="mt-3">
                                {this.state.errorMsg}
                          </Alert>
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

export default LoginForm;