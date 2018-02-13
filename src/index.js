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
            loading: true,
            error: '' //TODO
        };
    }

    componentWillMount() {
        ThirtySeven.ajax.get('auth').then(res => {
            if(res && res._status === true) {
                this.setState({
                    loading: false
                });
            }
        }).catch(err => {
            this.setState({
                error: JSON.stringify(err) //TODO
            })
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
        return (
            <div>{this.state.error}</div> //TODO
        );
    }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
export default MainPage;