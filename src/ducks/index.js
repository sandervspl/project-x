import { combineReducers } from 'redux';
import FrontpageReducer from './Frontpage';

const allReducers = combineReducers({
  frontpage: FrontpageReducer,
});

export default allReducers;
