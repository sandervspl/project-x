// dependencies
import { browserHistory } from 'react-router';
import { isLoggedIn } from 'helpers/auth';

// route paths
import routes from 'routes/routes';

export async function isAuth() {
  const auth = await isLoggedIn();
  if (auth) browserHistory.push(routes.user.profile);
}

export async function hasAccess() {
  const auth = await isLoggedIn();
  if (!auth) browserHistory.push(routes.home);
}
