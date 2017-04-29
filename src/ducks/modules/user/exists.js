// dependencies
import fetch from 'isomorphic-fetch';
import { isEmail } from 'validator';
import statusOK from '../../../helpers/async';
import { API_HOST } from '../../../config';

// actions
export const START = 'px/user/EXISTS_START';
export const SUCCESS = 'px/user/EXISTS_SUCCESS';
export const FAIL = 'px/user/EXISTS_FAIL';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  emailExists: false,
  usernameExists: false,
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
        [`${action.idType}Exists`]: action.exists,
      };

    case SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        errorMessage: '',
        [`${action.idType}Exists`]: action.exists,
      };

    case FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
        errorMessage: action.errorMessage,
        [`${action.idType}Exists`]: action.exists,
      };
    }

    default:
      return state;
  }
}

// action creators
function fetchStart(idType) {
  return {
    type: START,
    idType,
    exists: false,
  };
}

function fetchSuccess(idType) {
  return {
    type: SUCCESS,
    idType,
    exists: false,
  };
}

export function fetchFail(idType, errorMessage) {
  const idTypeCap = idType.charAt(0).toUpperCase() + idType.slice(1);
  const msg = errorMessage || `${idTypeCap} already exists.`;

  return {
    type: FAIL,
    idType,
    exists: true,
    errorMessage: msg,
  };
}

export function invalidId(idType) {
  return {
    type: FAIL,
    msg: '',
    idType,
    exists: false,
  };
}

// async actions
export const checkExists = id => async (dispatch) => {
  const isUsername = !isEmail(id);
  const idType = isUsername ? 'username' : 'email';

  // set init for request
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  };

  // set start state
  dispatch(fetchStart(idType));

  // request server
  try {
    let result = await fetch(`${API_HOST}/users/exists`, init);
    result = await result.json();

    const { statusCode } = result.meta;

    if (statusOK(statusCode)) {
      // id does not exist
      dispatch(fetchSuccess(idType));
      return false;
    }
  } catch (err) {
    // console.log(`EXISTS ERROR: ${err}`);
    dispatch(fetchFail(idType, 'Server error.'));
    return true;
  }

  // id exists
  dispatch(fetchFail(idType));
  return true;
};
