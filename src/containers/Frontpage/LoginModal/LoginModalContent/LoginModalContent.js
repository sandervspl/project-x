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
  { formValid, formValues, setEmailUsernameValidation, setPasswordValid }) =>
  (
    <div className="login-modal-content">
      <Form>
        <EmailUsernameInput setEmailUsernameValidation={setEmailUsernameValidation} />
        <PasswordInput setPasswordValidation={setPasswordValid} />
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
  setEmailUsernameValidation: PropTypes.func,
  setPasswordValid: PropTypes.func,
};

export default LoginModalContent;
