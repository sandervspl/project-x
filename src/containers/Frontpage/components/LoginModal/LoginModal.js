// dependencies
import React, { Component, PropTypes } from 'react';
import { Modal, Form, Divider } from 'semantic-ui-react';

// components
import FooterAuth from 'components/FooterAuth/FooterAuth';
import EmailUsernameInput from './components/EmailUsernameInput';
import PasswordInput from './components/PasswordInput';
import LoginButton from './components/LoginButton';
import ServiceLoginButtonGroup from './components/ServiceLoginButtonGroup';

// style
import './LoginModal.styl';

class LoginModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
  };

  state = {
    emailUsernameValid: null,
    passwordValid: null,
    formValid: null,
    formValues: {
      emailUsername: '',
      password: '',
    },
    loginFailed: false,
  };

  setLoginFailed = (loginFailed) => {
    this.setState({ loginFailed });
  }

  setEmailUsernameValidation = (valid, value) => {
    this.setState({
      emailUsernameValid: valid,
      formValues: {
        ...this.state.formValues,
        emailUsername: value,
      },
    }, this.isFormValid);
  }

  setPasswordValid = (valid, value) => {
    this.setState({
      passwordValid: valid,
      formValues: {
        ...this.state.formValues,
        password: value,
      },
    }, this.isFormValid);
  }

  isFormValid = () => {
    const { emailUsernameValid, passwordValid } = this.state;
    const formValid = emailUsernameValid && passwordValid;
    this.setState({ formValid });
  }

  render() {
    const { isOpen, setModalOpen } = this.props;
    const { formValid, formValues, loginFailed } = this.state;

    return (
      <Modal
        size="small"
        open={isOpen}
        onClose={() => setModalOpen('signin', false)}
        closeIcon="close"
        className="px-modal login-modal"
      >
        <Modal.Header>Sign in to start your party</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <EmailUsernameInput setEmailUsernameValidation={this.setEmailUsernameValidation} />
              <PasswordInput
                setPasswordValidation={this.setPasswordValid}
                loginFailed={loginFailed}
              />
              <LoginButton
                formValid={formValid}
                formValues={formValues}
                setLoginFailed={this.setLoginFailed}
              />
            </Form>
            <p className="help-login">
              <a href="#">{'Help, I can\'t sign in.'}</a>
            </p>
            <Divider horizontal>or</Divider>
            <h4>log in with</h4>
            <ServiceLoginButtonGroup />
          </Modal.Description>
        </Modal.Content>
        <FooterAuth
          type="signup"
          setModalOpen={setModalOpen}
        />
      </Modal>
    );
  }
}

export default LoginModal;
