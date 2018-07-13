/**
 * Window reducers
 */
import { WINDOW } from '../actions';

const initalState = {
  loginForm: false,
  operationModal: {
    modalShow: false,
    customerId: null,
    furnishId: null
  }
};

const window = (state = initalState, action) => {
  switch(action.type) {
    case WINDOW.LOGIN.TOGGLE:
      return Object.assign({}, state, {
        loginForm: !state.loginForm
      });
    case WINDOW.OPERATION_PANEL.TOGGLE:
      return Object.assign({}, state, {
        operationModal: {
          ...state.operationModal,
          modalShow: !state.operationModal.modalShow
        }
      });
    case WINDOW.OPERATION_PANEL.SET_PANEL_INFO:
      return Object.assign({}, state, {
        operationModal: {
          ...state.operationModal,
          customerId: action.customerId,
          furnishId: action.furnishId
        }
      });
    default:
      return state;
  }
};

export default window;
