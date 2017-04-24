const isDev = process.env.NODE_ENV === 'development';

const config = {
  server: {
    host: isDev ? 'localhost' : '',
    port: isDev ? '4000' : '',
  },
};

export default config;
