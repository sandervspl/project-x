// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import allReducers from './ducks';

// components
import Frontpage from './containers/Frontpage/Frontpage';

// style
// eslint-disable-next-line
import 'semantic-ui-css/semantic.css';
import './style/font-awesome/css/font-awesome.min.css';
import './style/global.styl';

const logger = createLogger();
const store = createStore(
  allReducers,
  applyMiddleware(thunk, promise, logger),
);

// store debugger
window.store = store;

ReactDOM.render(
  <Provider store={store} key="provider">
    <Frontpage />
  </Provider>,
  document.getElementById('root'),
);
