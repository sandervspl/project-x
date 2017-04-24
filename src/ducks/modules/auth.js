// dependencies
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { isEmpty } from 'validator';
import cfg from '../../config';

// Actions
export const LOAD_START = 'px/auth/LOAD_START';
export const LOAD_SUCCESS = 'px/auth/LOAD_SUCCESS';
export const LOAD_FAIL = 'px/auth/LOAD_FAIL';
export const LOGIN_START = 'px/auth/LOGIN_START';
export const LOGIN_SUCCESS = 'px/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'px/auth/LOGIN_FAIL';
export const LOGOUT_START = 'px/auth/LOGOUT_START';
export const LOGOUT_SUCCESS = 'px/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'px/auth/LOGOUT_FAIL';

const initialState = {
  load: false,
  loggingIn: false,
  loggingOut: false,
  user: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        load: true,
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        load: false,
        user: action.user,
      };

    case LOAD_FAIL:
      return {
        ...state,
        load: false,
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
        user: null,
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

function loginSuccess(result) {
  Cookies.set('username', result);

  return {
    type: LOGIN_SUCCESS,
    result,
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

export function loadStart() {
  return {
    type: LOAD_START,
  };
}

export function loadSuccess(username) {
  return {
    type: LOAD_SUCCESS,
    user: username,
  };
}

export function loadFail() {
  return {
    type: LOAD_FAIL,
    message: 'Unable to connect retrieve user data.',
  };
}


// async actions
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

    // grab server info from config
    const { host, port } = cfg.server;

    // set creation state to start
    dispatch(loginStart());

    // attempt async create request
    try {
      const result = await fetch(`http://${host}:${port}/auths/local`, init);

      if (result.status < 400) {
        dispatch(loginSuccess(emailUsername));
      } else {
        dispatch(loginFail());
      }

      return result;
    } catch (err) {
      dispatch(loginFail());
      return null;
    }
  };
}

export async function fetchUserData() {
  return async (dispatch) => {
    dispatch(loadStart());

    try {
      const username = await Cookies.get('username');

      if (username instanceof undefined || isEmpty(username)) {
        dispatch(loadFail());
        browserHistory.push('/');
      }

      dispatch(loadSuccess(username));
    } catch (err) {
      dispatch(loadFail());
      browserHistory.push('/');
    }
  };
}
