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
    },
    setCurrentCustomerId: (customerId) => {
      return {
        type: WINDOW.OPERATION_PANEL.SET_CURRENT_CUSTOMERID,
        customerId
      }
    }
  }

}
export default Window;
