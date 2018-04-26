import { AUTH } from '../index';

class Auth {

  setAuth(userInfo) {
    return {
      type: AUTH.SET,
      userInfo
    };
  }

  destroyAuth() {
    return {
      type: AUTH.DESTROY
    };
  }
}

export default Auth;
