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
  // check if user is saved in store
  const { user } = store.getState().app.user.getUser;
  if (!_.isEmpty(user)) return true;

  // check if we have auth token saved
  const token = Cookies.get(authToken);
  // console.log(`token: ${token}`);
  if (!token) return false;

  // if so, try to fetch user data to confirm if token is valid
  const getUserData = await fetchUserData(token);
  // console.log(`get user data: ${getUserData}`);
  if (getUserData) return true;

  return false;
}