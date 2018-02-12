import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import ThirtySeven from './CommonUtils/ThirtySeven.js';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        ThirtySeven.ajax().get('auth').then(res => {
            if(res && res._status === true) {
                this.setState({
                    loading: false
                });
            }
        });
    }

    render() {
        if (!this.state.loading) {
            return (<App />);
        }
        return null;
    }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
