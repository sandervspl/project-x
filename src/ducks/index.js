import { combineReducers } from 'redux';
import userReducer from './modules/user';
import partyReducer from './modules/party';
import FrontpageReducer from './modules/frontpage';

const allReducers = combineReducers({
  user: userReducer,
  party: partyReducer,
  frontpage: FrontpageReducer,
});

export default allReducers;
