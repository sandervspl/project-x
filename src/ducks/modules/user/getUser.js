// dependencies
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { API_HOST, cookies } from 'cfg';
import jwtDecode from 'jwt-decode';

// route paths
import routes from 'routes/routes';

// cookies
const { token: tokenKey } = cookies.auth;

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

const fetchFail = (errorMessage = 'Unable to connect to server.') => ({
  type: FAIL,
  errorMessage,
});

const fetchReset = () => ({
  type: RESET,
});

export const resetUser = () => dispatch => dispatch(fetchReset());

export const unauthorize = (fail = false) => async (dispatch) => {
  await Cookies.remove(tokenKey);

  if (fail) {
    await dispatch(fetchFail('Session expired. Please sign in.'));
  } else {
    await dispatch(fetchReset());
  }

  browserHistory.push(routes.home);
};

// async actions
export const fetchUserData = (pToken, pUserid) => async (dispatch) => {
  // set state to start
  dispatch(fetchStart());

  // get token
  const token = pToken || Cookies.get(tokenKey);
  const userId = pUserid || token ? jwtDecode(token).id : null;

  if (!token || !userId) {
    dispatch(unauthorize());
    return false;
  }

  // save token to cookie if needed
  if (pToken) {
    if (Cookies.get(tokenKey) && Cookies.get(tokenKey) !== pToken) {
      Cookies.set(tokenKey, pToken);
    } else if (!Cookies.get(tokenKey)) {
      Cookies.set(tokenKey, pToken);
    }
  }

  // set init for request
  const init = {
    headers: {
      'jwt-authorization-token': `${token}`,
    },
  };

  // fetch user data
  try {
    const result = await fetch(`${API_HOST}/users/${userId}`, init);

    if (result.ok) {
      const data = await result.json();

      // set state to success and save user data to store
      dispatch(fetchSuccess(data.data));
      return true;
    } else if (result.status === 401) {
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
