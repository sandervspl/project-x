// dependencies
import React from 'react';
import { Divider } from 'semantic-ui-react';

// components
import PolicyText from 'components/PolicyText/PolicyText';
import ServiceSignUpButtons from './ServiceSignUpButtons/ServiceSignUpButtons';
import EmailSignUpButton from './EmailSignUpButton/EmailSignUpButton';

// style
import './RegisterModalContent.styl';

const RegisterModalContent = () => (
  <div className="register-modal-content">
    <ServiceSignUpButtons />
    <Divider horizontal>OR</Divider>
    <EmailSignUpButton />
    <PolicyText />
  </div>
);

export default RegisterModalContent;
