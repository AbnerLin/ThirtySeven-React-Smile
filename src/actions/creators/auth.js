import { AUTH } from '../index';

class Auth {

  setAuth(userInfo) {
    return {
      type: AUTH.INIT,
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
