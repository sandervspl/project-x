// dependencies
import React from 'react';
import { Link } from 'react-router';

// components
import Icon from 'components/Icon/Icon';

// style
import './Settings.styl';

const Settings = () => (
  // FIXME: Link
  <Link to="#">
    <Icon name="gear" className="settings-btn" color="purple" size="big" />
  </Link>
);

export default Settings;
