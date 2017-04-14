// dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// components
import ProviderWithRoutes from './routes';

// style
// eslint-disable-next-line
import 'semantic-ui-css/semantic.css';
import './style/font-awesome/css/font-awesome.min.css';
import './style/global.styl';

ReactDOM.render(
  <ProviderWithRoutes />,
  document.getElementById('root'),
);
