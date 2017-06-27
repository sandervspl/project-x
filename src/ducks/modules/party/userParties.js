// dependencies
import Cookies from 'js-cookie';
import { statusOK } from 'helpers/async';
import { cookies } from 'cfg';

// api functions
import { fetchApi } from 'api';

// action creators
import { unauthorize } from '../user/getUser';

// cookies
const authToken = cookies.auth.token;

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
export const fetch = () => async (dispatch) => {
  // set fetch state to start
  dispatch(fetchStart());

  // get token
  const token = await Cookies.get(authToken);

  // set init for request
  const init = {
    headers: {
      'jwt-authorization-token': `Bearer ${token}`,
    },
  };

  try {
    const { statusCode, payload } = await fetchApi('parties', init);

    if (statusOK(statusCode)) {
      // set state to success
      dispatch(fetchSuccess(payload.parties));
      return true;
    } else if (statusCode === 401) {
      // auth error; token has probably expired.
      // console.error('token invalid or expired');
      dispatch(unauthorize(true));
      return false;
    }
  } catch (err) {
    // console.error(`userParties ERROR: ${err}`);
    // dispatch(fetchFail());
  }

  dispatch(fetchFail());
  return false;
};
