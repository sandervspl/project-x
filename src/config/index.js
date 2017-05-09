const server = {
  host: process.env.SERVER_HOST || 'localhost',
  port: process.env.SERVER_PORT || 4000,
};

export const API_HOST = `http://${server.host}:${server.port}`;

export const cookies = {
  auth: {
    token: 'authToken',
  },
};
