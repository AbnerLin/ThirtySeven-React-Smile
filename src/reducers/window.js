/**
 * Window reducers
 */
import { WINDOW } from '../actions';

const initalState = {
  loginForm: true
};

const window = (state = initalState, action) => {
  switch(action.type) {
    case WINDOW.LOGIN.SHOW_MODAL:
      return Object.assign({}, {
        loginForm: true
      });
    case WINDOW.LOGIN.HIDE_MODAL:
      return Object.assign({}, {
        loginForm: false
      });
    default:
      return state;
  }
};

export default window;
