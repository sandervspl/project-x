import { isLoggedIn } from 'helpers/auth';
import { browserHistory } from 'react-router';

export async function isAuth() {
  const auth = await isLoggedIn();
  if (auth) browserHistory.push('/user');
}

export async function hasAccess() {
  const auth = await isLoggedIn();
  if (!auth) browserHistory.push('/');
}
