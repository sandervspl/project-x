// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// components
import EmailUsernameInput from './EmailUsernameInput/EmailUsernameInput';
import PasswordInput from './PasswordInput/PasswordInput';
import LoginButton from './LoginButton/LoginButton';
import HelpLogin from './HelpLogin/HelpLogin';
import ServiceLoginButtons from './ServiceLoginButtons/ServiceLoginButtons';

const LoginModalContent = (
  { formValid, formValues }) =>
  (
    <div className="login-modal-content">
      <Form>
        <EmailUsernameInput />
        <PasswordInput />
        <LoginButton
          formValid={formValid}
          formValues={formValues}
        />
      </Form>
      <HelpLogin />
      <ServiceLoginButtons />
    </div>
  );

LoginModalContent.propTypes = {
  formValid: PropTypes.bool,
  formValues: PropTypes.shape({}),
};

export default LoginModalContent;
