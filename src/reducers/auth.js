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
      return {
        isLogin: true,
        userInfo: action.userInfo
      };
    case DESTROY_AUTH:
      return {
        isLogin: false
      };
    default:
      return state;
  }
}

export default auth;