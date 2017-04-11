import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome-webpack';
import 'semantic-ui-css/semantic.css';
import './style/global.styl';
import Frontpage from './containers/Frontpage/Frontpage';

ReactDOM.render(
  <Frontpage />,
  document.getElementById('root'),
);
