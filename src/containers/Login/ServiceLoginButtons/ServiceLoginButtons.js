// dependencies
import React from 'react';
import { Divider } from 'semantic-ui-react';

// components
import ServiceLoginButtonGroup from './ServiceLoginButtonGroup/ServiceLoginButtonGroup';

// style
import './ServiceLoginButtons.styl';

const ServiceLoginButtons = () => (
  <div className="service-login-button-container">
    <Divider horizontal>or</Divider>
    <h4 className="service-login-header">Log in with</h4>
    <ServiceLoginButtonGroup />
  </div>
);

export default ServiceLoginButtons;
