// dependencies
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import statusOK from '../../../helpers/async';
import { API_HOST, cookies } from '../../../config';

// auth actions
import { fetchUserData } from './getUser';

// Actions
export const CREATE_START = 'px/register/CREATE_START';
export const CREATE_SUCCESS = 'px/register/CREATE_SUCCESS';
export const CREATE_FAIL = 'px/register/CREATE_FAIL';
export const LOGIN_FORM_VALID = 'px/register/LOGIN_FORM_VALID';
export const LOGIN_FORM_INVALID = 'px/register/LOGIN_FORM_INVALID';
export const PERSONAL_FORM_VALID = 'px/register/PERSONAL_FORM_VALID';
export const PERSONAL_FORM_INVALID = 'px/register/PERSONAL_FORM_INVALID';
export const TO_REGISTER_PAGE = 'px/register/TO_REGISTER_PAGE';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  loginFormValid: null,
  personalFormValid: null,
  page: 1,
};

// cookies
const authToken = cookies.auth.token;

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_START:
      return {
        ...state,
        loading: true,
        error: false,
        loaded: false,
      };

    case CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
      };

    case CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
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
  // set creation state to start
  dispatch(createStart());

  // set init for request
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  };

  let result = await fetch(`${API_HOST}/users/create`, init);
  result = await result.json();

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
  // create request
  const create = await dispatch(createUser(newUser));

  if (create) {
    // fetch user data with auth token
    const token = Cookies.get(authToken);

    // fetch user data and save to state
    const userDataResponse = await dispatch(fetchUserData(token));
    const { statusCode } = userDataResponse.meta;

    if (statusOK(statusCode)) {
      // redirect to user page
      browserHistory.push('/user');
    }
  }
};
