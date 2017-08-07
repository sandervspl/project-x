import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer as routing } from 'react-router-redux';
import { responsiveStateReducer } from 'redux-responsive';
import { browserHistory } from 'react-router';


// reducers
import app from 'ducks';

const reducer = combineReducers({
  app,
  routing,
  browser: responsiveStateReducer,
});

// create store with middleware
const logger = createLogger();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk, promise, logger, routerMiddleware(browserHistory)),
  ),
);
/* eslint-enable */

// debugging
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  window.store = store;
}

export default store;
