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
    setPanelInfo: (customerId, furnishId) => {
      return {
        type: WINDOW.OPERATION_PANEL.SET_PANEL_INFO,
        customerId,
        furnishId
      }
    }
  }

}
export default Window;
