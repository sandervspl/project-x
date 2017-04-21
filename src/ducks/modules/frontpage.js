// Actions
const LOAD_START = 'px/frontpage/LOAD_START';
const LOAD_SUCCESS = 'px/frontpage/LOAD_SUCCESS';
const LOAD_FAIL = 'px/frontpage/LOAD_FAIL';

const initialState = {
  load: true,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        load: true,
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        load: false,
      };

    default:
      return state;
  }
}

// Action Creators
export function load() {
  return {
    type: LOAD_START,
  };
}

export function loadSuccess() {
  return {
    type: LOAD_SUCCESS,
  };
}

export function loadFail() {
  return {
    type: LOAD_FAIL,
    message: 'Unable to connect to server. Try again later.',
  };
}
