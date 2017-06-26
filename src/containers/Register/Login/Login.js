// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import * as createActions from 'ducks/modules/user/create';

// components
import PolicyText from 'components/PolicyText/PolicyText';
import EmailInput from './components/EmailInput/EmailInput';
import PasswordsGroup from './components/PasswordsGroup/PasswordsGroup';
import NextButton from './components/NextButton';

@connect(
  state => ({ create: state.app.user.userCreate }),
  createActions,
)
class Login extends Component {
  static propTypes = {
    setLoginFormValidation: PropTypes.func,
    create: PropTypes.shape({
      loginFormValid: PropTypes.bool,
      page: PropTypes.number,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      emailValid: null,
      passwordsValid: null,
    };
  }

  componentDidUpdate() {
    const { setLoginFormValidation } = this.props;
    const { loginFormValid } = this.props.create;

    if (this.state.emailValid && this.state.passwordsValid && !loginFormValid) {
      setLoginFormValidation(true);
    } else if ((!this.state.emailValid || !this.state.passwordsValid) && loginFormValid) {
      setLoginFormValidation(false);
    }
  }

  validateEmail = (emailValid) => {
    this.setState({ emailValid });
  };

  validatePasswords = (passwordsValid) => {
    this.setState({ passwordsValid });
  };

  render() {
    const { emailValid, passwordsValid } = this.state;
    const { page } = this.props.create;

    return (
      <section className={`register-form login ${page === 2 && 'show-personal'}`}>
        <h1>New account</h1>
        <p className="register-about">
          Registering an account at Project-x lets you create your own unique party environment.
          Invite your friends blabla etc.
        </p>
        <EmailInput
          mailValid={emailValid}
          validateEmail={this.validateEmail}
        />
        <PasswordsGroup
          passwordsValid={passwordsValid}
          validatePasswords={this.validatePasswords}
        />
        <NextButton />
        <PolicyText />
      </section>
    );
  }
}

export default Login;
