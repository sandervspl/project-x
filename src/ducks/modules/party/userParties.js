// dependencies
import Cookies from 'js-cookie';
import { cookies, API_HOST } from 'cfg';

// cookies
const { token: tokenKey } = cookies.auth;

// actions
export const START = 'px/userParties/START';
export const SUCCESS = 'px/userParties/SUCCESS';
export const FAIL = 'px/userParties/FAIL';


// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
  parties: [],
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
        errorMessage: '',
        parties: action.payload,
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
};

// action creators
const fetchStart = () => ({
  type: START,
});

const fetchSuccess = payload => ({
  type: SUCCESS,
  payload,
});

const fetchFail = (errorMessage = 'Unable to connect to server.') => ({
  type: FAIL,
  errorMessage,
});

// async actions
export const fetchHostedParties = () => async (dispatch) => {
  // set fetch state to start
  dispatch(fetchStart());

  // get token
  const token = await Cookies.get(tokenKey);

  // set init for request
  const init = {
    headers: {
      'jwt-authorization-token': `${token}`,
    },
  };

  try {
    const result = await fetch(`${API_HOST}/parties`, init);

    if (result.ok) {
      const data = await result.json();
      // set state to success
      dispatch(fetchSuccess(data.data));
      return true;
    }
  } catch (err) {
    // console.error(`userParties ERROR: ${err}`);
  }

  dispatch(fetchFail());
  return false;
};
