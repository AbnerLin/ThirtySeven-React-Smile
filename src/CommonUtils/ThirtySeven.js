import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../LoginForm';

const axios = require('axios');

class ThirtySeven {

    static API_URL = 'http://192.168.1.9:3000/api';

    constructor() {
        this.init();
    }

    init() {
        this._axios = axios.create({
            baseURL: ThirtySeven.API_URL,
            withCredentials: true,
            timeout: 3000
        });

        this._axios.interceptors.response.use((res) => {
            if (res.data._code === '0200') {
                return res.data;
            } else {
                ReactDOM.render( <LoginForm /> , document.getElementById('root'));
            }
        }, (err) => {
            return Promise.reject(err);
        });
    }
   
    get ajax() {
        return this._axios;
    }
}

export default new ThirtySeven();