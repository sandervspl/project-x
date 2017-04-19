import { combineReducers } from 'redux';
import FrontpageReducer from './modules/Frontpage';
import RegisterReducer from './modules/Register';

const allReducers = combineReducers({
  frontpage: FrontpageReducer,
  register: RegisterReducer,
});

export default allReducers;
