// dependencies
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { statusOK } from '../../../helpers/async';
import { API_HOST, cookies } from '../../../config';

// cookies
const authToken = cookies.auth.token;

// actions
export const START = 'px/user/FETCH_START';
export const SUCCESS = 'px/user/FETCH_SUCCESS';
export const FAIL = 'px/user/FETCH_FAIL';
export const RESET = 'px/user/FETCH_RESET';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  user: {},
  errorMessage: '',
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        loading: true,
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
        user: action.user,
        errorMessage: '',
      };

    case FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
        errorMessage: action.errorMessage,
        user: {},
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

// action creators
const fetchStart = () => ({
  type: START,
});

const fetchSuccess = user => ({
  type: SUCCESS,
  user,
});

const fetchFail = (errorMessage = 'Server error.') => ({
  type: FAIL,
  errorMessage,
});

const fetchReset = () => ({
  type: RESET,
});

export const resetUser = () => dispatch => dispatch(fetchReset());

export const unauthorize = (fail = false) => async (dispatch) => {
  await Cookies.remove(authToken);

  if (fail) {
    await dispatch(fetchFail('Session expired. Please sign in.'));
  } else {
    await dispatch(fetchReset());
  }

  browserHistory.push('/');
};

// async actions
export const fetchUserData = pToken => async (dispatch) => {
  // set state to start
  dispatch(fetchStart());

  // get token
  const token = pToken || Cookies.get(authToken);

  if (!token) {
    dispatch(fetchReset());
    return false;
  }

  // save token to cookie if needed
  if (pToken) {
    if (Cookies.get(authToken) && Cookies.get(authToken) !== pToken) {
      Cookies.set(authToken, pToken);
    } else if (!Cookies.get(authToken)) {
      Cookies.set(authToken, pToken);
    }
  }

  // set init for request
  const init = {
    method: 'GET',
    headers: {
      'jwt-authorization-token': `Bearer ${token}`,
    },
  };

  // fetch user data
  try {
    const result = await fetch(`${API_HOST}/users/me`, init);
    const data = await result.json();

    const { statusCode } = data.meta;
    const { payload } = data;

    if (statusOK(statusCode)) {
      // set state to success
      dispatch(fetchSuccess(payload));
      return true;
    } else if (statusCode === 401) {
      // auth error; token has probably expired.
      // console.error('token invalid or expired');
      dispatch(unauthorize(true));
      return false;
    }
  } catch (err) {
    // console.log(`GET DATA ERROR: ${err}`);
  }

  // something went wrong
  dispatch(fetchFail());
  return false;
};
