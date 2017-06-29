const routes = {
  home: '/',
  user: {
    profile: '/user',
  },
  register: {
    create: '/register',
    welcome: '/register/welcome',
  },
  party: {
    create: '/party/create',
    party: '/party/:id',
  },
};

export default routes;
