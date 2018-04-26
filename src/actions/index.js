/**
 * Action types.
 */
/** App level actions */
export const RESET = 'RESET'; // Refetch all data from server.

export const AUTH = {
  SET: 'SET',
  DESTROY: 'DESTROY'
};

/** Windows actions */
export const WINDOW = {
  LOGIN: {
    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL'
  }
};

/** Map actions */
export const ADD_FURNISH = 'ADD_FURNISH';
export const DELETE_FURNISH = 'DELETE_FURNISH';
export const MODIFY_FURNISH = 'MODIFY_FURNISH';

/** Customer actions */
export const CHECKIN = 'CHECKIN';
export const CHECKOUT = 'CHECKOUT';

/** Order actions */
export const SEND_ORDER = 'SEND_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const DELIVERY_ORDER = 'DELIVERY_ORDER';
