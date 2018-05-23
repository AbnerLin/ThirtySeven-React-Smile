import { WINDOW } from 'actions';

class Window {

  static login = {
    toggleModal: () => {
      return {
        type: WINDOW.LOGIN.TOGGLE
      }
    }
  }

  static operationPanel = {
    toggleModal: () => {
      return {
        type: WINDOW.OPERATION_PANEL.TOGGLE
      }
    }
  }

}
export default Window;
