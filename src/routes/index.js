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
import RegisterCreate from 'containers/Register/Create/RegisterCreate';
import RegisterWelcomePage from 'containers/Register/WelcomePage/WelcomePage';
import Login from 'containers/Login/Login';
import User from 'containers/User/User';
import Profile from 'containers/User/Profile/Profile';
import App from 'containers/App/App';
import CreateParty from 'containers/Parties/CreateParty/CreateParty';
import Party from 'containers/Parties/Party/Party';
import PartyFeed from 'containers/Parties/Party/Feed/Feed';
import PartyPlaylist from 'containers/Parties/Party/Playlist/Playlist';
import PartyAttendees from 'containers/Parties/Party/Attendees/Attendees';
import PartySettings from 'containers/Parties/Party/Settings/Settings';

// redux store
import store from 'store';

// helpers
import { isLoggedIn } from 'helpers/auth';

// actions
import { fetchUserData } from 'ducks/modules/user/getUser';

// middleware
import { isAuth, hasAccess } from './middleware/auth';

// route paths
import routes from './routes';

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
      <Route exact path={routes.home} components={Frontpage} onEnter={isAuth} />
      <Route exact path={routes.login.login} components={Login} onEnter={isAuth} />
      <Route exact path={routes.register.register} components={Register} onEnter={isAuth} />
      <Route path={routes.register.create} components={RegisterCreate} onEnter={isAuth} />
      <Route exact path={routes.register.welcome} components={RegisterWelcomePage} onEnter={hasAccess} />
      <Route components={App}>
        <Route path={routes.user.profile} components={User} onEnter={hasAccess}>
          <IndexRoute components={Profile} />
          <Route path={routes.party.create} components={CreateParty} onEnter={hasAccess} />
          {/*TODO: onEnter={check if invited etc. (see notes)}*/}
          <Route path={routes.party.party.home} components={Party}>
            <IndexRoute components={PartyFeed} />
            <Route path={routes.party.party.playlist} components={PartyPlaylist} />
            <Route path={routes.party.party.attendees} components={PartyAttendees} />
            <Route path={routes.party.party.settings} components={PartySettings} />
          </Route>
        </Route>
      </Route>
      <Route path="*" components={Error404} />
    </Router>
  </Provider>
);
