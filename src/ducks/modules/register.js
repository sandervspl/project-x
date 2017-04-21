// dependencies
import fetch from 'isomorphic-fetch';

// Actions
const CREATE_START = 'px/register/CREATE_START';
const CREATE_SUCCESS = 'px/register/CREATE_SUCCESS';
const CREATE_FAIL = 'px/register/CREATE_FAIL';
const LOGIN_FORM_VALID = 'px/register/LOGIN_FORM_VALID';
const LOGIN_FORM_INVALID = 'px/register/LOGIN_FORM_INVALID';
const PERSONAL_FORM_VALID = 'px/register/PERSONAL_FORM_VALID';
const PERSONAL_FORM_INVALID = 'px/register/PERSONAL_FORM_INVALID';
const TO_REGISTER_PAGE = 'px/register/TO_REGISTER_PAGE';

const initialState = {
  loaded: false,
  loginFormValid: null,
  personalFormValid: null,
  isCreatingNewAccount: false,
  page: 1,
};

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
export function createStart() {
  return {
    type: CREATE_START,
  };
}

export function createSuccess() {
  return {
    type: CREATE_SUCCESS,
  };
}

export function createFail() {
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
export function createUser() {
  return (dispatch) => {
    dispatch(createStart());

    return fetch('https://www.reddit.com/r/dota2.json')
      .then((response) => {
        if (response.status >= 400) {
          dispatch(createFail());
          throw new Error('Bad response from server');
        }

        dispatch(createSuccess());

        return response;
      })
      .catch((err) => {
        if (err) {
          dispatch(createFail());
          throw new Error(err);
        }
      });
  };
}
