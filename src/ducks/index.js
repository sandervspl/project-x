import { combineReducers } from 'redux';
import userReducer from './modules/user';
import FrontpageReducer from './modules/frontpage';

const allReducers = combineReducers({
  user: userReducer,
  frontpage: FrontpageReducer,
});

export default allReducers;
