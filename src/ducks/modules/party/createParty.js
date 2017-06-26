// dependencies
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import { statusOK } from 'helpers/async';
import { API_HOST, cookies } from 'cfg';

// route paths
import routes from 'routes/routes';

// action creators
import { unauthorize } from '../user/getUser';

// cookies
const authToken = cookies.auth.token;


// actions
export const START = 'px/createParty/START';
export const SUCCESS = 'px/createParty/SUCCESS';
export const FAIL = 'px/createParty/FAIL';


// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
  createdParty: {},
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
        createdParty: action.payload,
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
const createStart = () => ({
  type: START,
});

const createSuccess = payload => ({
  type: SUCCESS,
  payload,
});

const createFail = (errorMessage = 'Unable to connect to server.') => ({
  type: FAIL,
  errorMessage,
});

// async actions
const createParty = (title, description) => async (dispatch) => {
  // set create state to start
  dispatch(createStart());

  // get token
  const token = await Cookies.get(authToken);

  // init party body with party data from user
  const newPartyRequest = {
    party: {
      title,
      description,
      startDate: new Date().toISOString(),
    },
  };

  // set init for request
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'jwt-authorization-token': `Bearer ${token}`,
    },
    body: JSON.stringify(newPartyRequest),
  };

  try {
    const result = await fetch(`${API_HOST}/parties/create`, init);
    const data = await result.json();

    const { statusCode } = data.meta;
    const { payload } = data;

    if (statusOK(statusCode)) {
      // set state to success
      dispatch(createSuccess(payload));
      return true;
    } else if (statusCode === 401) {
      // auth error; token has probably expired.
      // console.error('token invalid or expired');
      dispatch(unauthorize(true));
      return false;
    }
  } catch (err) {
    // console.error(`createParty ERROR: ${err}`);
    // dispatch(createFail());
    // return false;
  }

  dispatch(createFail());
  return false;
};

export const createPartyProcess = (title, description) => async (dispatch) => {
  // create request
  const create = await dispatch(createParty(title, description));

  if (create) {
    // redirect to user page
    browserHistory.push(routes.user.profile);
  }
};
