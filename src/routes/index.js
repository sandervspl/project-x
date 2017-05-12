/* eslint-disable */
// dependencies
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';

// components
import Error404 from 'components/Error404/Error404';
import Frontpage from 'containers/Frontpage/Frontpage';
import Register from 'containers/Register/Register';
import User from 'containers/User/User';
import Profile from 'containers/User/Profile/Profile';
import App from 'containers/App/App';
import WelcomePage from 'containers/Register/WelcomePage/WelcomePage';

// redux store
import store from 'store';

// helpers
import { isLoggedIn } from 'helpers/auth';

// actions
import { fetchUserData } from 'ducks/modules/user/getUser';

// middleware
import { isAuth, hasAccess } from './middleware/auth';

// debugging
if (process.env.NODE_ENV === 'development') {
  window.cookies = Cookies;
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// fetch user data if logged in
if (isLoggedIn()) {
  store.dispatch(fetchUserData());
}

// NOTE: routes on the App path will get the navbar and sidebar
export default () => (
  <Provider store={store} key="provider">
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route exact path="/" components={Frontpage} onEnter={isAuth} />
      <Route path="/register/welcome" components={WelcomePage} onEnter={hasAccess} />
      <Route components={App}>
        <Route path="/register" components={Register} onEnter={isAuth} />
        <Route path="/user" components={User} onEnter={hasAccess}>
          <IndexRoute components={Profile} />
        </Route>
      </Route>
      <Route path="*" components={Error404} />
    </Router>
  </Provider>
);
