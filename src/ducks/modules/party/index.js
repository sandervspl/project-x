import { combineReducers } from 'redux';
import createPartyReducer from './createParty';
import userPartiesReducer from './userParties';
import activePartyReducer from './activeParty';

export default combineReducers({
  createParty: createPartyReducer,
  userParties: userPartiesReducer,
  activeParty: activePartyReducer,
});
