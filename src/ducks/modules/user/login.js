// dependencies
import { browserHistory } from 'react-router';
import { statusOK } from '../../../helpers/async';
import { API_HOST } from '../../../config';

// other actions
import { fetchUserData } from './getUser';

// actions
export const START = 'px/user/LOGIN_START';
export const SUCCESS = 'px/user/LOGIN_SUCCESS';
export const FAIL = 'px/user/LOGIN_FAIL';
export const RESET = 'px/user/LOGIN_RESET';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        loading: action.loading !== undefined ? action.loading : true,
        error: false,
        loaded: false,
        errorMessage: '',
      };

    case SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        errorMessage: '',
      };

    case FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
        errorMessage: action.errorMessage,
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

// action creators
const loginStart = (loading = true) => ({
  type: START,
  loading,
});

const loginSuccess = () => ({
  type: SUCCESS,
});

const loginReset = () => ({
  type: RESET,
});

const loginFail = (errorMessage = 'Invalid username and/or password.') => ({
  type: FAIL,
  errorMessage,
});

export const resetLogin = () => dispatch => dispatch(loginReset());

// async actions
export const login = credentials => async (dispatch) => {
  const { emailUsername, password } = credentials;

  // set up correct object for request
  const userCredentials = {
    username: emailUsername,
    password,
  };

  // set init for request
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userCredentials),
  };

  // set login state to start
  dispatch(loginStart());

  // authorization
  try {
    const result = await fetch(`${API_HOST}/auths/local`, init);
    const data = await result.json();

    // set state to result
    const { statusCode } = data.meta;
    dispatch(statusOK(statusCode) ? loginSuccess() : loginFail());

    return data;
  } catch (err) {
    // console.error(`LOGIN ERROR: ${err}`);
    dispatch(loginFail('Unable to sign in at this moment.'));
    return null;
  }
};

export const loginProcess = credentials => async (dispatch) => {
  // attempt authorization on server
  const loginResponse = await dispatch(login(credentials));
  const authorized = loginResponse && statusOK(loginResponse.meta.statusCode);

  // unable to authorize
  if (!authorized) return false;

  // grab token from response
  const { token } = loginResponse.payload;

  // fetch user data with token
  try {
    const fetchedUserData = await dispatch(fetchUserData(token));

    if (fetchedUserData) {
      // redirect to user page
      browserHistory.push('/user');
      return true;
    }
  } catch (err) {
    // console.log(`LOGIN FETCH DATA ERROR: ${err}`);
  }

  return false;
};
