// dependencies
import { API_HOST, cookies } from 'cfg';
import Cookies from 'js-cookie';

// cookies
const authToken = cookies.auth.token;

// actions
export const START = 'px/activeParty/START';
export const SUCCESS = 'px/activeParty/SUCCESS';
export const FAIL = 'px/activeParty/FAIL';

// state
export const initialState = {
  loading: false,
  error: false,
  loaded: false,
  errorMessage: '',
  party: {
    id: 0,
    banner: null,
    bannerUrl: null,
    code: '0',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    host: {
      id: 0,
      avatar: '',
      avatarUrl: '',
      firstName: '',
      lastName: '',
    },
    settings: {
      approveSongs: false,
      allowDuplicateSongs: false,
      allowExplicitSongs: false,
    },
  },
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
        party: action.payload,
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
const fetchStart = () => ({
  type: START,
});

const fetchSuccess = payload => ({
  type: SUCCESS,
  payload,
});

const fetchFail = (errorMessage = 'Unable to connect to server.') => ({
  type: FAIL,
  errorMessage,
});

// async actions
export const fetchPartyData = partyId => async (dispatch) => {
  // set fetch state to start
  dispatch(fetchStart());

  try {
    const token = await Cookies.get(authToken);

    // set init for request
    const init = {
      headers: {
        'jwt-authorization-token': token,
      },
    };

    const result = await fetch(`${API_HOST}/parties/${partyId}`, init);

    if (result.ok) {
      const data = await result.json();

      // set state to result
      dispatch(fetchSuccess(data.data));
    }
  } catch (err) {
    // console.error(`activeParty ERROR: ${err}`);
    dispatch(fetchFail());
  }
};
