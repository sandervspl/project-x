import { combineReducers } from 'redux';
import FrontpageReducer from './modules/Frontpage';

const allReducers = combineReducers({
  frontpage: FrontpageReducer,
});

export default allReducers;
