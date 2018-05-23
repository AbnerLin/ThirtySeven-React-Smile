import rootReducer from 'reducers'
import axios from 'axios';
import { createStore } from 'redux'
import { AuthReduxCreator, WindowReduxCreator } from 'actions/creators'


class ThirtySeven {

  static store = createStore(rootReducer);
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
        ThirtySeven.store.dispatch(AuthReduxCreator.destroyAuth());
        ThirtySeven.store.dispatch(WindowReduxCreator.login.toggleModal());
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
export const store = ThirtySeven.store;
