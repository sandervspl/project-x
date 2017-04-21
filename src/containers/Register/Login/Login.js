// dependencies
import React, { Component, PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

// actions
import * as RegisterActions from 'ducks/modules/register';

// components
import PolicyText from 'components/PolicyText/PolicyText';
import EmailInput from './components/EmailInput/EmailInput';
import PasswordsGroup from './components/PasswordsGroup/PasswordsGroup';
import NextButton from './components/NextButton';


@connect(
  state => ({ register: state.app.register }),
  RegisterActions,
)
class Login extends Component {
  static propTypes = {
    setLoginFormValidation: PropTypes.func,
    register: PropTypes.shape({
      loginFormValid: PropTypes.bool,
      page: PropTypes.number,
    }),
  };

  state = {
    mailValid: null,
    passwordsValid: null,
  };

  validateEmail = (mailValid) => {
    this.setState({ mailValid }, this.isFormValid);
  };

  validatePasswords = (passwordsValid) => {
    this.setState({ passwordsValid }, this.isFormValid);
  };

  isFormValid = () => {
    const { mailValid, passwordsValid } = this.state;
    const { setLoginFormValidation } = this.props;
    const { loginFormValid } = this.props.register;
    const isValid = mailValid && passwordsValid;

    if (loginFormValid !== isValid) {
      setLoginFormValidation(isValid);
    }
  };

  render() {
    const { mailValid, passwordsValid } = this.state;
    const { page } = this.props.register;

    return (
      <section className={`register-form login ${page === 2 && 'show-personal'}`}>
        <h1>New account</h1>
        <p className="register-about">
          Registering an account at Project-x lets you create your own unique party environment.
          Invite your friends blabla etc.
        </p>
        <Form>
          <EmailInput
            mailValid={mailValid}
            validateEmail={this.validateEmail}
          />
          <PasswordsGroup
            passwordsValid={passwordsValid}
            validatePasswords={this.validatePasswords}
          />
          <NextButton />
        </Form>
        <PolicyText />
      </section>
    );
  }
}

export default Login;
