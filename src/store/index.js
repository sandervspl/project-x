import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
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

const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    promise,
    logger,
    routerMiddleware(browserHistory),
  ),
);

// debugging
if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
