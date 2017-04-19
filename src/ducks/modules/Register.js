// dependencies
import fetch from 'isomorphic-fetch';

// Actions
const CREATE_START = 'px/register/CREATE_START';
const CREATE_SUCCESS = 'px/register/CREATE_SUCCESS';
const CREATE_FAIL = 'px/register/CREATE_FAIL';

const initialState = {
  loaded: false,
  isCreatingNewAccount: false,
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
