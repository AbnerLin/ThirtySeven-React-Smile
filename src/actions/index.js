/**
 * Action types.
 */
/** App level actions */
export const RESET = 'RESET'; // Refetch all data from server.

/** Auth actions */
export const AUTH = {
  INIT: 'AUTH_INIT',
  DESTROY: 'DESTROY'
};

/** Customer actions */
export const CUSTOMER = {
  INIT: 'CUSTOMER_INIT',
  CHECKIN: 'CHECKIN',
  CHECKOUT: 'CHECKOUT'
};

/** Windows actions */
export const WINDOW = {
  LOGIN: {
    TOGGLE: 'LOGIN_FORM.TOGGLE'
  },
  OPERATION_PANEL: {
    TOGGLE: 'OPERATION_PANEL.TOGGLE',
    SET_CURRENT_CUSTOMERID: 'SET_CURRENT_CUSTOMERID'
  }
};

/** Map actions */
export const MAP = {
  INIT: 'MAP_INIT'
};

/** Map actions */
export const ADD_FURNISH = 'ADD_FURNISH';
export const DELETE_FURNISH = 'DELETE_FURNISH';
export const MODIFY_FURNISH = 'MODIFY_FURNISH';

/** Order actions */
export const SEND_ORDER = 'SEND_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const DELIVERY_ORDER = 'DELIVERY_ORDER';
