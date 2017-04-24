import { combineReducers } from 'redux';
import AuthReducer from './modules/auth';
import FrontpageReducer from './modules/frontpage';
import RegisterReducer from './modules/register';

const allReducers = combineReducers({
  auth: AuthReducer,
  frontpage: FrontpageReducer,
  register: RegisterReducer,
});

export default allReducers;
