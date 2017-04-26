// dependencies
import fetch from 'isomorphic-fetch';
import { isEmail } from 'validator';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import statusOK from '../../helpers/async';
import cfg from '../../config';

// auth actions
import { fetchUserData } from './auth';

// Actions
export const CREATE_START = 'px/register/CREATE_START';
export const CREATE_SUCCESS = 'px/register/CREATE_SUCCESS';
export const CREATE_FAIL = 'px/register/CREATE_FAIL';
export const LOGIN_FORM_VALID = 'px/register/LOGIN_FORM_VALID';
export const LOGIN_FORM_INVALID = 'px/register/LOGIN_FORM_INVALID';
export const PERSONAL_FORM_VALID = 'px/register/PERSONAL_FORM_VALID';
export const PERSONAL_FORM_INVALID = 'px/register/PERSONAL_FORM_INVALID';
export const TO_REGISTER_PAGE = 'px/register/TO_REGISTER_PAGE';
export const FETCH_START = 'px/register/FETCH_START';
export const FETCH_SUCCESS = 'px/register/FETCH_SUCCESS';
export const FETCH_FAIL = 'px/register/FETCH_FAIL';

// state
export const initialState = {
  loaded: false,
  loginFormValid: null,
  personalFormValid: null,
  isCreatingNewAccount: false,
  failMessage: '',
  page: 1,
  fetching: false,
  fetchMessage: '',
  emailExists: false,
  usernameExists: false,
};

// server info
const { host, port } = cfg.server;

const authToken = 'authToken';

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_START:
      return {
        ...state,
        isCreatingNewAccount: true,
      };

    case CREATE_SUCCESS:
      return {
        ...state,
        isCreatingNewAccount: false,
      };

    case CREATE_FAIL:
      return {
        ...state,
        isCreatingNewAccount: false,
        failMessage: action.message,
      };

    case LOGIN_FORM_VALID:
      return {
        ...state,
        loginFormValid: true,
      };

    case LOGIN_FORM_INVALID:
      return {
        ...state,
        loginFormValid: false,
      };

    case PERSONAL_FORM_VALID:
      return {
        ...state,
        personalFormValid: true,
      };

    case PERSONAL_FORM_INVALID:
      return {
        ...state,
        personalFormValid: false,
      };

    case TO_REGISTER_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case FETCH_START:
      return {
        ...state,
        fetching: true,
        fetchMessage: action.msg,
        [`${action.idType}Exists`]: action.exists,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetchMessage: action.msg,
        [`${action.idType}Exists`]: action.exists,
      };

    case FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        fetchMessage: action.msg,
        [`${action.idType}Exists`]: action.exists,
      };

    default:
      return state;
  }
}

// Action Creators
function createStart() {
  return {
    type: CREATE_START,
  };
}

function createSuccess() {
  return {
    type: CREATE_SUCCESS,
  };
}

function createFail() {
  return {
    type: CREATE_FAIL,
    message: 'Unable to connect to server. Try again later.',
  };
}

function fetchStart(idType) {
  return {
    type: FETCH_START,
    msg: '',
    idType,
    exists: false,
  };
}

function fetchSuccess(idType) {
  return {
    type: FETCH_SUCCESS,
    msg: '',
    idType,
    exists: false,
  };
}

const fetchFailMsg = 'Unable to connect to server. Try again later.';
function fetchFail(idType, msg = fetchFailMsg) {
  if (idType) {
    return {
      type: FETCH_FAIL,
      msg,
      idType,
      exists: true,
    };
  }

  return {
    type: FETCH_FAIL,
    msg,
  };
}

export function invalidId(idType) {
  return {
    type: FETCH_FAIL,
    msg: '',
    idType,
    exists: false,
  };
}

export function setLoginFormValidation(valid) {
  if (valid) return { type: LOGIN_FORM_VALID };
  return { type: LOGIN_FORM_INVALID };
}

export function setPersonalFormValidation(valid) {
  if (valid) return { type: PERSONAL_FORM_VALID };
  return { type: PERSONAL_FORM_INVALID };
}

export function toRegisterPage(pageNum) {
  return {
    type: TO_REGISTER_PAGE,
    page: pageNum,
  };
}


// async actions
export const createUser = newUser => async (dispatch) => {
  // set init for request
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  };

  const result = await fetch(`http://${host}:${port}/users/create`, init)
    .then(response => response.json());

  const { statusCode } = result.meta;
  const { token } = result.payload;

  if (statusOK(statusCode)) {
    // save token to cookie
    Cookies.set(authToken, token);

    // set state to success
    dispatch(createSuccess());
    return true;
  }

  dispatch(createFail());
  return false;
};

export const createUserProcess = newUser => async (dispatch) => {
  // set creation state to start
  dispatch(createStart());

  // attempt async create request
  try {
    const create = await dispatch(createUser(newUser));

    if (create) {
      // fetch user data with auth token
      const token = Cookies.get(authToken);

      // fetch user data and save to state
      await dispatch(fetchUserData(token));

      // redirect to user page
      browserHistory.push('/user');
    } else {
      // console.log('not ok status');
      dispatch(createFail());
    }
  } catch (err) {
    // console.log(err);
    dispatch(createFail());
  }
};

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

  try {
    const result = await fetch(`http://${host}:${port}/users/exists`, init)
      .then(response => response.json());

    const { statusCode } = result.meta;

    if (statusCode === 200) {
      // id does not exist
      dispatch(fetchSuccess(idType));
      return false;
    }
  } catch (err) {
    // console.log(err);
  }

  // id exists
  const idTypeCap = idType.charAt(0).toUpperCase() + idType.slice(1);

  dispatch(fetchFail(idType, `${idTypeCap} already exists.`));
  return true;
};
