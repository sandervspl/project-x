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
    party: {
      home: '/party/:id',
      playlist: '/party/:id/playlist',
      attendees: '/party/:id/attendees',
      settings: '/party/:id/settings',
    },
  },
};

export default routes;
