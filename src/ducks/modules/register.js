// dependencies
import fetch from 'isomorphic-fetch';

// Actions
export const CREATE_START = 'px/register/CREATE_START';
export const CREATE_SUCCESS = 'px/register/CREATE_SUCCESS';
export const CREATE_FAIL = 'px/register/CREATE_FAIL';
export const LOGIN_FORM_VALID = 'px/register/LOGIN_FORM_VALID';
export const LOGIN_FORM_INVALID = 'px/register/LOGIN_FORM_INVALID';
export const PERSONAL_FORM_VALID = 'px/register/PERSONAL_FORM_VALID';
export const PERSONAL_FORM_INVALID = 'px/register/PERSONAL_FORM_INVALID';
export const TO_REGISTER_PAGE = 'px/register/TO_REGISTER_PAGE';

export const initialState = {
  loaded: false,
  loginFormValid: null,
  personalFormValid: null,
  isCreatingNewAccount: false,
  failMessage: '',
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
export function createUser(newUser) {
  console.log(newUser);

  return async (dispatch) => {
    dispatch(createStart());

    try {
      const result = await fetch('https://www.reddit.com/r/dota2.json');
      dispatch(createSuccess());
      return result;
    } catch (err) {
      dispatch(createFail());
      return null;
    }
  };
}
