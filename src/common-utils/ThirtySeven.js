import rootReducer from '../reducers'
import axios from 'axios';
import { createStore } from 'redux'
import { Auth, Window } from '../actions/creators'

export const store = createStore(rootReducer);

class ThirtySeven {

  // static API_URL = 'http://192.168.1.9:3000/api';
  static API_URL = 'http://localhost:3000/api';
  now = new Date();

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
      if (res.data._code === '0040') {
        // invalid authorization
        store.dispatch(Auth.destroyAuth());
        store.dispatch(Window.login.showModal());
        return Promise.reject(res._msg);
      }
      return res.data;

    }, (err) => {
      return Promise.reject(err);
    });
  }

  get ajax() {
    return this._axios;
  }
}

export default new ThirtySeven();
