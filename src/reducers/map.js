/**
* Map reducers
*/
import { MAP } from '../actions';

const initialState = {
  furnishClass: null
};

const map = (state = initialState, action) => {
  switch(action.type) {
    case MAP.INIT:
      return Object.assign({}, state, {
        furnishClass: action.furnishClass
      });
    default:
      return state;
  }
};

export default map;
