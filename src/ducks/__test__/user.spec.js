/* eslint-disable */
// dependencies
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// ducks
import * as createActions from '../modules/user/create';
import * as existsActions from '../modules/user/exists';
import * as loginActions from '../modules/user/login';
import * as getUserActions from '../modules/user/getUser';
const createReducer = createActions.default;
const existsReducer = existsActions.default;
const loginReducer = loginActions.default;
const getUserReducer = getUserActions.default;

// setup mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// helpers
import { statusOK } from '../../helpers/async';

// test variables
const email = 'joedoe@gmail.com';
const username = 'joedoe';
const password = 'asdfgfhfdfsda';
let authToken = '';

describe('User: create', () => {
  it('Should have a default state', () => {
    expect(createReducer(undefined, {})).toEqual(createActions.initialState);
  });

  it('Should create user', () => {
    // fake store
    const store = mockStore({});

    const newUser = {
      email,
      username,
      password,
      firstName: 'joe',
      lastName: 'doe',
    };
    const expectedActions = [
      { type: createActions.START },
      { type: createActions.SUCCESS },
    ];

    return store.dispatch(createActions.createUser(newUser))
      .then((response) => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(response).toEqual(true);
      });
  });
});

describe('User: exists', () => {
  it('Should have a default state', () => {
    expect(existsReducer(undefined, {})).toEqual(existsActions.initialState);
  });

  it('Should return true if user does exist', () => {
    // fake store
    const store = mockStore({});

    // actions to compare
    const expectedActions = [
      {
        type: existsActions.START,
        idType: 'username',
        exists: false,
      },
      {
        type: existsActions.FAIL,
        idType: 'username',
        exists: true,
      },
    ];

    return store.dispatch(existsActions.checkExists(username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Should return false if user does not exist', () => {
    // fake store
    const store = mockStore({});

    // test variables
    const username2 = '2q3wgretrhg';

    // actions to compare
    const expectedActions = [
      {
        type: existsActions.START,
        idType: 'username',
        exists: false,
      },
      {
        type: existsActions.SUCCESS,
        idType: 'username',
        exists: false,
      },
    ];

    return store.dispatch(existsActions.checkExists(username2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('User: login', () => {
  it('Should have a default state', () => {
    expect(loginReducer(undefined, {})).toEqual(loginActions.initialState);
  });

  it('Should log in', () => {
    // fake store
    const store = mockStore({});

    // login credentials
    const credentials = {
      emailUsername: username,
      password
    };

    // actions to compare
    const expectedActions = [
      { type: loginActions.START },
      { type: loginActions.SUCCESS },
    ];

    return store.dispatch(loginActions.login(credentials))
      .then((response) => {
        const { statusCode } = response.meta;

        if (statusOK(statusCode)) {
          authToken = response.payload.token;
        }

        expect(store.getActions()).toEqual(expectedActions);
        expect(statusCode).toEqual(200);
      });
  });
});

describe('User: getUser', () => {
  it('Should have a default state', () => {
    expect(getUserReducer(undefined, {})).toEqual(getUserActions.initialState);
  });

  it('Should return user data with token', () => {
    // fake store
    const store = mockStore({});

    // actions to compare
    const expectedActions = [
      { type: getUserActions.START },
      {
        type: getUserActions.SUCCESS,
        user: {
          active: 1,
          email: 'joedoe@gmail.com',
          firstName: 'joe',
          id: 66,
          lastName: 'doe',
          username: 'joedoe',
        },
      },
    ];

    return store.dispatch(getUserActions.fetchUserData(authToken))
      .then((response) => {
        const { statusCode } = response.meta;

        expect(store.getActions()).toEqual(expectedActions);
        expect(statusCode).toEqual(200);
      });
  });

  it('Should fail (UNAUTHORIZED 401) on wrong token', () => {
    // fake store
    const store = mockStore({});

    // fake token
    const fakeToken = 'w8g7q8g8&QQ&E*QEe78wQeb';

    // actions to compare
    const expectedActions = [
      { type: getUserActions.START },
      { type: getUserActions.FAIL },
    ];

    return store.dispatch(getUserActions.fetchUserData(fakeToken))
      .then((response) => {
        const { statusCode } = response.meta;

        expect(store.getActions()).toEqual(expectedActions);
        expect(statusCode).toEqual(401);
      });
  });
});
