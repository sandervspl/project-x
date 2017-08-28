// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { setLoginFormValidation } from 'ducks/modules/user/create';

// components
import PolicyText from 'components/PolicyText/PolicyText';
import TitleWithLogo from 'components/TitleWithLogo/TitleWithLogo';
import AboutPage from 'components/AboutPage/AboutPage';
import EmailInput from './components/EmailInput/EmailInput';
import PasswordsGroup from './components/PasswordsGroup/PasswordsGroup';
import NextButton from './components/NextButton';

function mapStateToProps(state) {
  return {
    create: state.app.user.userCreate,
  };
}

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
    const { loginFormValid } = this.props.create;
    const { emailValid, passwordsValid } = this.state;
    const isValid = emailValid && passwordsValid;

    if (isValid && !loginFormValid) {
      this.props.setLoginFormValidation(true);
    } else if (!isValid && loginFormValid) {
      this.props.setLoginFormValidation(false);
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
    const isPageTwo = page === 2;

    return (
      <section className={`register-form login ${isPageTwo ? 'show-personal' : ''}`}>
        <TitleWithLogo> New account </TitleWithLogo>

        <AboutPage>
          Registering an account at Project-x lets you create your own unique party environment.
          Invite your friends blabla etc.
        </AboutPage>

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

export default connect(mapStateToProps, { setLoginFormValidation })(Login);
