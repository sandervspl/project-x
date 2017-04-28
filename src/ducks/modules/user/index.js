import { combineReducers } from 'redux';
import createReducer from './create';
import existsReducer from './exists';
import loginReducer from './login';
import getUserReducer from './getUser';

export default combineReducers({
  getUser: getUserReducer,
  userExists: existsReducer,
  userCreate: createReducer,
  userLogin: loginReducer,
});
