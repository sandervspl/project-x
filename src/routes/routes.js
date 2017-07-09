const routes = {
  home: '/',
  login: {
    login: '/login',
  },
  user: {
    profile: '/user',
  },
  register: {
    register: '/register',
    create: '/register/create',
    welcome: '/register/welcome',
  },
  party: {
    create: '/party/create',
    party: '/party/:id',
  },
};

export default routes;
