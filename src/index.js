import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import './style/font-awesome/css/font-awesome.min.css';
import './style/global.styl';
import Frontpage from './containers/Frontpage/Frontpage';

ReactDOM.render(
  <Frontpage />,
  document.getElementById('root'),
);
