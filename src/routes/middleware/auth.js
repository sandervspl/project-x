import { isLoggedIn } from 'helpers/auth';
import { browserHistory } from 'react-router';

// eslint-disable-next-line
export function authRedirect() {
  if (isLoggedIn()) browserHistory.push('/user');
}
