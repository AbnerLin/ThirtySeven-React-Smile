import { WINDOW } from '../index';

class Window {

  get login() {
    return {
      showModal: () => {
        return {
          type: WINDOW.LOGIN.SHOW_MODAL
        }
      },
      hideModal: () => {
        return {
          type: WINDOW.LOGIN.HIDE_MODAL
        }
      }
    }
  }

}
export default Window;
