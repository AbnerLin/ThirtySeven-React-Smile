import { WINDOW } from 'actions';

class Window {

  static login = {
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
export default Window;
