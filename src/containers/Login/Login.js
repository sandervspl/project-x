// dependencies
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

// actions
import { loginProcess } from 'ducks/modules/user/login';

// components
import PageInner from 'components/PageInner/PageInner';
import Header from 'components/Header/Header';
import FooterAuth from 'components/FooterAuth/FooterAuth';
import LoginFormError from './LoginFormError/LoginFormError';
import EmailUsernameInput from './EmailUsernameInput/EmailUsernameInput';
import PasswordInput from './PasswordInput/PasswordInput';
import LoginButton from './LoginButton/LoginButton';
import HelpLogin from './HelpLogin/HelpLogin';
import ServiceLoginButtons from './ServiceLoginButtons/ServiceLoginButtons';

// style
import './Login.styl';

class Login extends Component {
  static propTypes = {
    loginProcess: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      formValid: {
        emailUsername: null,
        password: null,
      },
      formValues: {
        emailUsername: '',
        password: '',
      },
    };
  }

  setEmailUsernameState = (emailUsername, valid) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        emailUsername,
      },
      formValid: {
        ...this.state.formValid,
        emailUsername: valid,
      },
    });
  };

  setPasswordState = (password, valid) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        password,
      },
      formValid: {
        ...this.state.formValid,
        password: valid,
      },
    });
  };

  isFormValid = () =>
    this.state.formValid.emailUsername && this.state.formValid.password;

  loginWithCredentials = () => {
    const { formValues } = this.state;
    this.props.loginProcess(formValues);
  };

  render() {
    return (
      <PageInner>
        <Header textAlign="center" size="small">(logo)</Header>
        <Header textAlign="center" size="big">Sign in to Project-x</Header>

        <Form className="login-form__container">
          <EmailUsernameInput onChange={this.setEmailUsernameState} />
          <PasswordInput onChange={this.setPasswordState} />

          <LoginFormError />

          <LoginButton
            formValid={this.isFormValid()}
            onClick={this.loginWithCredentials}
          />
        </Form>

        <HelpLogin />

        <ServiceLoginButtons />

        <FooterAuth type="signup" />
      </PageInner>
    );
  }
}

export default connect(null, { loginProcess })(Login);
