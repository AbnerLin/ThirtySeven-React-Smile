/**
 * Auth reducers
 */
import { AUTH } from '../actions';

const initialState = {
  isLogin: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.INIT:
      return Object.assign({}, state, {
        isLogin: true,
        userInfo: action.userInfo
      });
    case AUTH.DESTROY:
      return initialState;
    default:
      return state;
  }
};

export default auth;
