// dependencies
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import { API_HOST, cookies } from 'cfg';

// route paths
import routes from 'routes/routes';

// action creators
import { unauthorize } from '../user/getUser';

// cookies
const { token: tokenKey } = cookies.auth;


// actions
export const CREATE_START = 'px/createParty/CREATE_START';
export const CREATE_SUCCESS = 'px/createParty/CREATE_SUCCESS';
export const CREATE_FAIL = 'px/createParty/CREATE_FAIL';
export const FETCH_START = 'px/createParty/FETCH_START';
export const FETCH_SUCCESS = 'px/createParty/FETCH_SUCCESS';
export const FETCH_FAIL = 'px/createParty/FETCH_FAIL';
export const UPDATE_PARTY_VALUE = 'px/createParty/UPDATE_PARTY_VALUE';
export const RESET = 'px/createParty/RESET';


// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
  party: {
    settings: {
      approveSongs: false,
      allowExplicitSongs: false,
      allowDuplicateSongs: true,
    },
    banner: null,
    code: '0',
    hostId: 0,
    active: false,
    id: 0,
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    bannerUrl: null,
  },
};

// reducer
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_START:
    case FETCH_START:
      return {
        ...state,
        loading: true,
        error: false,
        loaded: false,
        errorMessage: '',
      };

    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        errorMessage: '',
        createdParty: action.payload,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        errorMessage: '',
        party: action.payload,
      };

    case CREATE_FAIL:
    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
        errorMessage: action.errorMessage,
      };

    case UPDATE_PARTY_VALUE:
      return {
        ...state,
        party: {
          ...state.party,
          ...action.values,
        },
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

// action creators
const createStart = () => ({
  type: CREATE_START,
});

const createSuccess = () => ({
  type: CREATE_SUCCESS,
});

const createFail = (errorMessage = 'Unable to connect to server.') => ({
  type: CREATE_FAIL,
  errorMessage,
});

const fetchStart = () => ({
  type: FETCH_START,
});

const fetchSuccess = payload => ({
  type: FETCH_SUCCESS,
  payload,
});

const fetchFail = (errorMessage = 'Unable to connect to server.') => ({
  type: FETCH_FAIL,
  errorMessage,
});

const reset = () => ({
  type: RESET,
});

export const resetCreateParty = () => (dispatch) => {
  dispatch(reset());
};

export const updatePartyValue = values => ({
  type: UPDATE_PARTY_VALUE,
  values,
});

// async actions
export const fetchInitialParty = () => async (dispatch) => {
  dispatch(fetchStart());

  try {
    const token = Cookies.get(tokenKey);

    const init = {
      method: 'POST',
      headers: {
        'jwt-authorization-token': token,
      },
    };

    const result = await fetch(`${API_HOST}/parties`, init);

    if (result.ok) {
      const data = await result.json();
      const { data: party } = data;

      dispatch(fetchSuccess(party));

      return party;
    }
  } catch (err) {
    // console.error(`fetchInitialParty ERROR: ${err}`);
    dispatch(fetchFail());
  }

  return null;
};

const createParty = newParty => async (dispatch) => {
  // set create state to start
  dispatch(createStart());

  // get token
  const token = await Cookies.get(tokenKey);

  // create request body
  const newPartyBody = {
    party: {
      title: newParty.title,
      description: newParty.description,
      startDate: newParty.startDate,
      endDate: newParty.endDate,
      settings: newParty.settings,
    },
    banner: newParty.banner,
  };

  // set init for request
  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'jwt-authorization-token': `${token}`,
    },
    body: JSON.stringify(newPartyBody),
  };

  try {
    const result = await fetch(`${API_HOST}/parties/${newParty.id}`, init);

    if (result.ok) {
      // set state to success
      dispatch(createSuccess());
      return true;
    } else if (result.status === 401) {
      // auth error; token has probably expired.
      // console.error('token invalid or expired');
      dispatch(unauthorize(true));
      return false;
    }
  } catch (err) {
    // console.error(`createParty ERROR: ${err}`);
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
