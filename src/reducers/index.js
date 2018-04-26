import { combineReducers } from 'redux';
import auth from './auth';
import window from './window';
import customer from './customer';

export default combineReducers({
  auth,
  window, // controller about window of app, such as modal, tooltip etc.
  customer
});
