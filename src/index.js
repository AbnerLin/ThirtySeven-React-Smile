import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';
import ThirtySeven from './CommonUtils/ThirtySeven.js';
import Config from './config.json';

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true
    };

    this.loginSucceed = this.loginSucceed.bind(this);
  }

  componentDidMount() {
    ThirtySeven.ajax.get('auth').then(res => {
      if (res && res._status === true) {
        this.loginSucceed();
      } else {
        ReactDOM.render(<LoginForm loginSucceed={this.loginSucceed} force={true}  /> , document.getElementById('stage'));
      }
    });
  }

  loginSucceed() {
    this.setState({
      loading: false
    }, () => {
      ThirtySeven.attachAuthChecker();
    });
  }

  render() {
    const content = !this.state.loading ? (
      <div> 
        <App />
      </div>
    ) : null;  

    return (
      <div id="main">
        <div id="stage"></div>
        <Header title={Config.Title} subTitle={Config.SubTitle} />
        {content}
        <Footer copyright={Config.Copyright} />
      </div>
    );
  }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
export default MainPage;