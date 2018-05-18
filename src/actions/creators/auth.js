import { AUTH } from 'actions';

class Auth {

  static setAuth(userInfo) {
    return {
      type: AUTH.INIT,
      userInfo
    };
  }

  static destroyAuth() {
    return {
      type: AUTH.DESTROY
    };
  }
}

export default Auth;
