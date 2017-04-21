import { combineReducers } from 'redux';
import FrontpageReducer from './modules/frontpage';
import RegisterReducer from './modules/register';

const allReducers = combineReducers({
  frontpage: FrontpageReducer,
  register: RegisterReducer,
});

export default allReducers;
