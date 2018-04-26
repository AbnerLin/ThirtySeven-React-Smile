import { combineReducers } from 'redux';
import auth from './auth';
import window from './window';

export default combineReducers({
  auth,
  window // controller about window of app, such as modal, tooltip etc.
});
