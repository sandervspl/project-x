const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

export const API_HOST = isDev ? 'http://localhost:4000' : '';

export const cookies = {
  auth: {
    token: 'authToken',
  },
};
