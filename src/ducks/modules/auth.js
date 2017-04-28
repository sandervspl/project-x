// dependencies
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { isEmpty } from 'validator';
import statusOK from '../../helpers/async';
import { API_HOST, cookies } from '../../config';

// Actions
export const FETCH_START = 'px/auth/FETCH_START';
export const FETCH_SUCCESS = 'px/auth/FETCH_SUCCESS';
export const FETCH_FAIL = 'px/auth/FETCH_FAIL';
export const LOGIN_START = 'px/auth/LOGIN_START';
export const LOGIN_SUCCESS = 'px/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'px/auth/LOGIN_FAIL';
export const LOGOUT_START = 'px/auth/LOGOUT_START';
export const LOGOUT_SUCCESS = 'px/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'px/auth/LOGOUT_FAIL';

// state
const initialState = {
  load: false,
  loggingIn: false,
  loggingOut: false,
  user: null,
};

// cookies
const authToken = cookies.auth.token;

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        load: true,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        load: false,
        user: action.user,
      };

    case FETCH_FAIL:
      return {
        ...state,
        load: false,
        user: null,
        failMessage: action.message,
      };

    case LOGIN_START:
      return {
        ...state,
        loggingIn: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
      };

    case LOGOUT_START:
      return {
        ...state,
        loggingOut: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
      };

    default:
      return state;
  }
}


// action creators
function loginStart() {
  return {
    type: LOGIN_START,
  };
}

function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginFail() {
  return {
    type: LOGIN_FAIL,
  };
}

export function logoutStart() {
  return {
    type: LOGOUT_START,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFail() {
  return {
    type: LOGOUT_FAIL,
  };
}

export function fetchStart() {
  return {
    type: FETCH_START,
  };
}

export function fetchSuccess(user) {
  return {
    type: FETCH_SUCCESS,
    user,
  };
}

export function fetchFail() {
  return {
    type: FETCH_FAIL,
    message: 'Unable to retrieve user data.',
  };
}


// async actions
export const fetchUserData = pToken => async (dispatch) => {
  dispatch(fetchStart());

  // get token from cookie
  const token = pToken || Cookies.get(authToken);

  // set init for request
  const init = {
    method: 'GET',
    headers: {
      'jwt-authorization-token': `Bearer ${token}`,
    },
  };

  try {
    // fetch user data
    const result = await fetch(`${API_HOST}/users/me`, init)
      .then(response => response.json());

    const { statusCode } = result.meta;

    if (statusOK(statusCode)) {
      const { payload } = result;
      dispatch(fetchSuccess(payload));
    } else if (statusCode === 401) {
      // auth error; token has probably expired.
      // console.error('ERROR: Token has expired or is invalid. Login required.');
      dispatch(fetchFail());

      // redirect to front page with login modal open
      browserHistory.push('/?login=1');
    } else {
      // some sort of error occured
      // console.error(`ERROR: ${statusCode}`);
      dispatch(fetchFail());
    }

    return result;
  } catch (err) {
    // console.log(err);
    dispatch(fetchFail());
    return null;
  }
};

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

  // attempt async login request
  try {
    const result = await fetch(`${API_HOST}/auths/local`, init)
      .then(response => response.json());

    // fetch success
    const { statusCode } = result.meta;
    const { token } = result.payload;

    if (statusOK(statusCode)) {
      if (!isEmpty(token)) {
        // save token
        Cookies.set(authToken, token);

        // fetch user data with retrieved token
        // console.log('Fetching user data after log in...');
        const userData = await dispatch(fetchUserData());
        const fetchStatus = userData.meta.statusCode;

        if (statusOK(fetchStatus)) {
          dispatch(loginSuccess());
          browserHistory.push('/user');
          return true;
        }
      }
    }
  } catch (err) {
    // console.log(err);
  }

  // failed
  dispatch(loginFail());
  return false;
};
