// dependencies
import React from 'react';
import { Link } from 'react-router';

// style
import './HelpLogin.styl';

const HelpLogin = () => (
  <p className="help-login">
    <Link to="#">{'Help, I can\'t sign in.'}</Link>
  </p>
);

HelpLogin.propTypes = {};

export default HelpLogin;
