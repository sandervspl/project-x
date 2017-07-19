// dependencies
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import { statusOK } from 'helpers/async';
import { API_HOST, cookies } from 'cfg';

// route paths
import routes from 'routes/routes';

// auth actions
import { fetchUserData } from './getUser';

// Actions
export const START = 'px/user/CREATE_START';
export const SUCCESS = 'px/user/CREATE_SUCCESS';
export const FAIL = 'px/user/CREATE_FAIL';
export const LOGIN_FORM_VALID = 'px/user/LOGIN_FORM_VALID';
export const LOGIN_FORM_INVALID = 'px/user/LOGIN_FORM_INVALID';
export const PERSONAL_FORM_VALID = 'px/user/PERSONAL_FORM_VALID';
export const PERSONAL_FORM_INVALID = 'px/user/PERSONAL_FORM_INVALID';
export const TO_REGISTER_PAGE = 'px/user/TO_REGISTER_PAGE';
export const UPDATE_USER_VALUES = 'px/user/UPDATE_USER_VALUES';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
  loginFormValid: null,
  personalFormValid: null,
  page: 1,
  user: {
    email: '',
    password: '',
    passwordRepeat: '',
    firstName: '',
    lastName: '',
    username: '',
  },
};

// cookies
const authToken = cookies.auth.token;

// Reducer
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
      };

    case FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
        errorMessage: action.errorMessage,
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

    case UPDATE_USER_VALUES:
      return {
        ...state,
        user: {
          ...state.user,
          [action.key]: action.value,
        },
      };

    default:
      return state;
  }
};

// Action Creators
const createStart = () => ({
  type: START,
});

const createSuccess = () => ({
  type: SUCCESS,
});

const createFail = (errorMessage = 'Unable to register at this moment.') => ({
  type: FAIL,
  errorMessage,
});

export const setLoginFormValidation = (valid) => {
  if (valid) return { type: LOGIN_FORM_VALID };
  return { type: LOGIN_FORM_INVALID };
};

export const setPersonalFormValidation = (valid) => {
  if (valid) return { type: PERSONAL_FORM_VALID };
  return { type: PERSONAL_FORM_INVALID };
};

export const toRegisterPage = pageNum => ({
  type: TO_REGISTER_PAGE,
  page: pageNum,
});

export const updateUserValues = (key, value) => ({
  type: UPDATE_USER_VALUES,
  key,
  value,
});

// async actions
export const createUser = newUser => async (dispatch) => {
  // set creation state to start
  dispatch(createStart());

  // set up correct format
  const userObject = { user: { ...newUser } };

  // set init for request
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObject),
  };

  try {
    const result = await fetch(`${API_HOST}/users/create`, init);
    const data = await result.json();

    const { statusCode } = data.meta;

    if (statusOK(statusCode)) {
      const { token } = data.payload;

      // save token to cookie
      Cookies.set(authToken, token);

      // set state to success
      dispatch(createSuccess());
      return true;
    }
  } catch (err) {
    // console.log(`CREATE ERROR: ${err}`);
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
    const fetchedUserData = await dispatch(fetchUserData(token));

    // redirect to user page
    if (fetchedUserData) browserHistory.push(routes.register.welcome);
  }
};
