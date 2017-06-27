import { combineReducers } from 'redux';
import createPartyReducer from './createParty';
import userPartiesReducer from './userParties';

export default combineReducers({
  createParty: createPartyReducer,
  userParties: userPartiesReducer,
});
