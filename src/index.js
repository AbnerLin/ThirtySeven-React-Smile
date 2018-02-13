import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import Header from './Header';
import Footer from './Footer';
import ThirtySeven from './CommonUtils/ThirtySeven.js';
import Config from './config.json';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        ThirtySeven.ajax.get('auth').then(res => {
            if(res && res._status === true) {
                this.setState({
                    loading: false
                });
            }
        });
    }

    render() {
        if (!this.state.loading) {
            return (
              <div>
                <Header title={Config.Title} subTitle={Config.SubTitle} />
                <App />
                <Footer copyright={Config.Copyright} />
              </div>
            );
        }
        return null;
    }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
export default MainPage;