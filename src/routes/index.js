// dependencies
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing, routerMiddleware } from 'react-router-redux';
import { responsiveStateReducer } from 'redux-responsive';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import Cookies from 'js-cookie';

// components
import Error404 from 'components/Error404/Error404';
import Frontpage from 'containers/Frontpage/Frontpage';
import Register from 'containers/Register/Register';
import User from 'containers/User/User';
import Profile from 'containers/Profile/Profile';

// reducers
import app from 'ducks';

const reducer = combineReducers({
  app,
  routing,
  browser: responsiveStateReducer,
});

// create store with middleware
const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    promise,
    logger,
    routerMiddleware(browserHistory),
  ),
);

// store debugger
if (process.env.NODE_ENV === 'development') {
  window.store = store;
  window.cookies = Cookies;
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Provider store={store} key="provider">
    <Router history={history}>
      <Route exact path="/" components={Frontpage} />
      <Route path="/register" components={Register} />
      <Route path="/user" components={User}>
        <IndexRoute components={Profile} />
      </Route>
      <Route path="*" components={Error404} />
    </Router>
  </Provider>
);
