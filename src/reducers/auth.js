/**
 * Auth reducers
 */
import { SET_AUTH, DESTROY_AUTH } from '../actions';

const initialState = {
  isLogin: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return Object.assign({}, {
        isLogin: true,
        userInfo: action.userInfo
      });
    case DESTROY_AUTH:
      return initialState;
    default:
      return state;
  }
}

export default auth;