// dependencies
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { isEmpty } from 'validator';
import cfg from '../../config';

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
const authToken = 'authToken';

// server info
const { host, port } = cfg.server;

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
        user: action.result,
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
function checkStatus(status) {
  return status >= 200 && status < 300;
}

export function fetchUserData() {
  return async (dispatch) => {
    dispatch(fetchStart());

    // get token from cookie
    const token = Cookies.get(authToken);

    // set init for request
    const init = {
      method: 'GET',
      headers: {
        'jwt-authorization-token': `Bearer ${token}`,
      },
    };

    try {
      // fetch user data
      const result = await fetch(`http://${host}:${port}/users/me`, init)
        .then(response => response.json())
        .catch(dispatch(fetchFail()));

      const { statusCode } = result.meta;

      if (checkStatus(statusCode)) {
        const { payload } = result;
        dispatch(fetchSuccess(payload));
      } else {
        dispatch(fetchFail());
      }

      return result;
    } catch (err) {
      return null;
    }
  };
}

export function login(credentials) {
  return async (dispatch) => {
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
      const result = await fetch(`http://${host}:${port}/auths/local`, init)
        .then(response => response.json())
        .catch(dispatch(loginFail()));

      // fetch success
      const { statusCode } = result.meta;
      const { token } = result.payload;

      if (checkStatus(statusCode)) {
        if (!isEmpty(token)) {
          // save token
          Cookies.set(authToken, token);

          // fetch user data with retrieved token
          const userData = await dispatch(fetchUserData());
          const fetchStatus = userData.meta.statusCode;

          if (checkStatus(fetchStatus)) {
            dispatch(loginSuccess());
            browserHistory.push('/user');
            return true;
          }

          dispatch(loginFail());
          return false;
        }
      }

      // failed
      dispatch(loginFail());

      return false;
    } catch (err) {
      dispatch(loginFail());

      return false;
    }
  };
}
