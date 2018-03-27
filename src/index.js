import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { setAuth } from './actions'
import ThirtySeven from './common-utils/ThirtySeven';
import { store } from './common-utils/ThirtySeven';
import './index.css';
import App from './compoments/App';
import Header from './compoments/Header';
import Footer from './compoments/Footer';
import LoginForm from './compoments/LoginForm';
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
    /** Get user info. */
    ThirtySeven.ajax.get('auth').then(res => {
      if (res && res._status === true) {
        console.log(res);
        store.dispatch(setAuth(res._data));
      }

      console.log(store.getState());

      // setInterval(() => {
      //   console.log(store.getState());
      // }, 2000);
    });

    // ThirtySeven.ajax.get('auth').then(res => {
    //   if (res && res._status === true) {
    //     this.loginSucceed();
    //   } else {
    //     ReactDOM.render(
    //       <LoginForm loginSucceed={this.loginSucceed} 
    //                  force={true}  />, 
    //       document.getElementById('stage')
    //     );
    //   }
    // });
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
      <Provider store={store}>
        <div>
          <div id="stage"></div>
          <LoginForm />
          <Header title={Config.Title} subTitle={Config.SubTitle} />
          {content}
          <Footer copyright={Config.Copyright} />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
export default MainPage;