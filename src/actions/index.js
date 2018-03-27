/**
 * Action types.
 */
/** App level actions */
export const RESET = 'RESET'; // Refetch all data from server.

/** Auth actions */
export const SET_AUTH = 'SET_AUTH';
export const DESTROY_AUTH = 'DESTROY_AUTH';

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

export const setAuth = userInfo => {
  return {
    type: SET_AUTH,
    userInfo
  };
}

export const destroyAuth = () => {
  return { type: DESTROY_AUTH };
}