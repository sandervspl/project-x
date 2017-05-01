import store from 'store';
import _ from 'lodash';
import Cookies from 'js-cookie';

// cookies
import { cookies } from 'cfg';

// actions
import { fetchUserData } from 'ducks/modules/user/getUser';

const authToken = cookies.auth.token;

// eslint-disable-next-line
export async function isLoggedIn() {
  const { user } = store.getState().app.user.getUser;
  if (_.isEmpty(user)) return false;

  const token = Cookies.get(authToken);
  if (!token) return false;

  const getUserData = await fetchUserData(token);
  if (!getUserData) return false;

  return true;
}
