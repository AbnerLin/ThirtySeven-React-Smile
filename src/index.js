import React from 'react';
import ReactDOM from 'react-dom';
import ThirtySeven from './common-utils/ThirtySeven';
import { Provider } from 'react-redux'
import { Auth, Window } from './actions/creators'
import { store } from './common-utils/ThirtySeven';

import App from './compoments/App';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import LoginForm from './compoments/LoginForm';

import Config from './config.json';
import './index.css';

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true
    };
  }

  componentDidMount() {
    /** Get user info. */
    ThirtySeven.ajax.get('auth').then(res => {
      if (res && res._status === true) {
        store.dispatch(Auth.setAuth(res._data));
        store.dispatch(Window.login.hideModal());
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <LoginForm force={false} />
          <Header title={Config.Title} subTitle={Config.SubTitle} />
          <App />
          <Footer copyright={Config.Copyright} />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
export default MainPage;
