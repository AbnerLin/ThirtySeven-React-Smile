import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../LoginForm';

const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.response.use((res) => {
    if (res.data._status && res.data._code === '0200') {
        return res.data;
    } else {
        // TODO overlay the login page.
        ReactDOM.render( < LoginForm / > , document.getElementById('root'));
    }
}, (err) => {
    return Promise.reject(err);
});

class ThirtySeven {

    construct() {

    }

    /**
     * @option axios api option.
     * @element show loading on specified element.
     */
    static Ajax(option, elementId) {
        if (elementId) {
            // TODO show loading...
            console.log('got element');
        }
        return axios(option);
    }
}

export default ThirtySeven;