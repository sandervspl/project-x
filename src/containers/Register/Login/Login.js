// dependencies
import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

// components
import PolicyText from '../../../components/PolicyText/PolicyText';
import EmailInput from './components/EmailInput/EmailInput';
import PasswordsField from './components/PasswordsField/PasswordsField';

class Login extends Component {
  state = {
    mailValid: null,
    passwordsValid: null,
  };

  componentDidMount() {
    this.buttonEl = document.querySelector('#next-btn');
  }

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
    this.setState({ mailValid });
  };

  validatePasswords = (passwordsValid) => {
    this.setState({ passwordsValid });
  };

  shouldButtonEnable = () => {
    const button = this.buttonEl;
    const { mailValid, passwordsValid } = this.state;

    if (!button) return;

    if (button.classList.contains('disabled')) {
      if (mailValid && passwordsValid) {
        button.classList.remove('disabled');
      }
    } else if (!mailValid || !passwordsValid) {
      if (!button.classList.contains('disabled')) {
        button.classList.add('disabled');
      }
    }
  };

  render() {
    const { mailValid, passwordsValid } = this.state;
    this.shouldButtonEnable();

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
          <PasswordsField
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
