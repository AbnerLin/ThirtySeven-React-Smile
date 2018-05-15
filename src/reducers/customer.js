/**
 * Customer reducers
 */
import { CUSTOMER } from '../actions';

const initialState = {
  customerInfo: null
};

const customer = (state = initialState, action) => {

  switch(action.type) {
    case CUSTOMER.INIT:
      return Object.assign({}, {
        customerInfo: action.customerInfo
      });
    case CUSTOMER.CHECKIN:
      return Object.assign({}, state, {
        customerInfo: [
          ...state.customerInfo,
          action.customerInfo
        ]
      });
    case CUSTOMER.CHECKOUT:
      return Object.assign({}, state, {
        customerInfo: state.customerInfo.filter(customer => customer.customerId !== action.customerId)
      });
    default:
      return state;
  }
};

export default customer;
