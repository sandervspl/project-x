// dependencies
import fetch from 'isomorphic-fetch';
import cfg from '../../config';

// Actions
export const LOGIN_START = 'px/auth/LOGIN_START';
export const LOGIN_SUCCESS = 'px/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'px/auth/LOGIN_FAIL';
export const LOGOUT_START = 'px/auth/LOGOUT_START';
export const LOGOUT_SUCCESS = 'px/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'px/auth/LOGOUT_FAIL';

const initialState = {
  loggingIn: false,
  loggingOut: false,
  user: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
      console.log(result);
      if (result.status < 400) {
        dispatch(loginSuccess());
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
