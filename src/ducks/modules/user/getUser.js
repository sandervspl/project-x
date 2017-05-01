// dependencies
import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import statusOK from '../../../helpers/async';
import { API_HOST, cookies } from '../../../config';

// cookies
const authToken = cookies.auth.token;

// actions
export const START = 'px/user/FETCH_START';
export const SUCCESS = 'px/user/FETCH_SUCCESS';
export const FAIL = 'px/user/FETCH_FAIL';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  user: {},
  errorMessage: '',
};

// reducer
export default function reducer(state = initialState, action = {}) {
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
      };

    default:
      return state;
  }
}

// action creators
function fetchStart() {
  return {
    type: START,
  };
}

function fetchSuccess(user) {
  return {
    type: SUCCESS,
    user,
  };
}

function fetchFail() {
  return {
    type: FAIL,
    errorMessage: 'Server error.',
  };
}

// async actions
export const fetchUserData = pToken => async (dispatch) => {
  // set state to start
  dispatch(fetchStart());

  // get token
  const token = pToken || Cookies.get(authToken);

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
    let response = await fetch(`${API_HOST}/users/me`, init);
    response = await response.json();

    const { statusCode } = response.meta;
    const { payload } = response;

    if (statusOK(statusCode)) {
      // set state to success
      dispatch(fetchSuccess(payload));
      return true;
    } else if (statusCode === 401) {
      // auth error; token has probably expired.
      browserHistory.push('/?login=1');
    }
  } catch (err) {
    // console.log(`GET DATA ERROR: ${err}`);
  }

  // something went wrong
  dispatch(fetchFail());
  return false;
};