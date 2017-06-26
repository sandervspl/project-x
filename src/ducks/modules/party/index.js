import { combineReducers } from 'redux';
import createPartyReducer from './createParty';

export default combineReducers({
  createParty: createPartyReducer,
});
