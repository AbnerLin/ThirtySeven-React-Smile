/**
 * Window reducers
 */
import { WINDOW } from '../actions';

const initalState = {
  loginForm: false,
  operationModal: false
};

const window = (state = initalState, action) => {
  switch(action.type) {
    case WINDOW.LOGIN.TOGGLE:
      return Object.assign({}, state, {
        loginForm: !state.loginForm
      });
    case WINDOW.OPERATION_PANEL.TOGGLE:
      return Object.assign({}, state, {
        operationModal: !state.operationModal
      });
    default:
      return state;
  }
};

export default window;
