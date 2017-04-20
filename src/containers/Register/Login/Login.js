// dependencies
import React, { Component, PropTypes } from 'react';
import { Form, Button } from 'semantic-ui-react';

// components
import PolicyText from '../../../components/PolicyText/PolicyText';
import EmailInput from './components/EmailInput/EmailInput';
import PasswordsGroup from './components/PasswordsGroup/PasswordsGroup';

class Login extends Component {
  static propTypes = {
    setLoginFormValidation: PropTypes.func.isRequired,
  };

  state = {
    mailValid: null,
    passwordsValid: null,
  };

  onClick = (e) => {
    const { mailValid, passwordsValid } = this.state;

    e.preventDefault();

    if (mailValid && passwordsValid) {
      const forms = document.querySelectorAll('.register-form');
      forms.forEach((form) => {
        form.classList.add('show-personal');
      });
    }
  };

  validateEmail = (mailValid) => {
    this.setState({ mailValid }, this.shouldButtonEnable);
  };

  validatePasswords = (passwordsValid) => {
    this.setState({ passwordsValid }, this.shouldButtonEnable);
  };

  shouldButtonEnable = () => {
    const button = document.querySelector('#next-btn');
    const { mailValid, passwordsValid } = this.state;
    const { setLoginFormValidation } = this.props;

    if (!button) return;

    if (button.classList.contains('disabled')) {
      if (mailValid && passwordsValid) {
        setLoginFormValidation(true);
        button.classList.remove('disabled');
      }
    } else if (!mailValid || !passwordsValid) {
      if (!button.classList.contains('disabled')) {
        setLoginFormValidation(false);
        button.classList.add('disabled');
      }
    }
  };

  render() {
    const { mailValid, passwordsValid } = this.state;

    return (
      <section className="register-form login">
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
          <Button
            color="purple"
            className="big-btn disabled"
            id="next-btn"
            onClick={this.onClick}
            fluid
          >
            Next
          </Button>
        </Form>
        <PolicyText />
      </section>
    );
  }
}

export default Login;
