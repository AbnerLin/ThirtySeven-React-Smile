import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../LoginForm';

const axios = require('axios');

class ThirtySeven {

    static API_URL = 'http://localhost:3000/api';

    constructor() {
        this.init();
    }

    init() {
        this._axios = axios.create({
            baseURL: ThirtySeven.API_URL,
        });

        this._axios.interceptors.response.use((res) => {
            if (res.data._status && res.data._code === '0200') {
                return res.data;
            } else {
                // TODO overlay the login page.
                ReactDOM.render( < LoginForm / > , document.getElementById('root'));
            }
        }, (err) => {
            return Promise.reject(err);
        });
    }
   
    /**
     * @element show loading on specified element.
     */
    ajax(elementId) {
        if (elementId) {
            // TODO show loading...
            console.log('got element');
        }
        return this._axios;
    }
}

export default new ThirtySeven();