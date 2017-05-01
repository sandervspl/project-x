// dependencies
import React, { Component, PropTypes } from 'react';
import { Modal, Form, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import * as loginActions from 'ducks/modules/user/login';
import * as userActions from 'ducks/modules/user/getUser';

// components
import FooterAuth from 'components/FooterAuth/FooterAuth';
import EmailUsernameInput from './components/EmailUsernameInput';
import PasswordInput from './components/PasswordInput';
import LoginButton from './components/LoginButton';
import ServiceLoginButtonGroup from './components/ServiceLoginButtonGroup';

// style
import './LoginModal.styl';

@connect(
  state => ({
    userLogin: state.app.user.userLogin,
    getUser: state.app.user.getUser,
  }),
  dispatch => ({
    loginActions: bindActionCreators(loginActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }),
)
class LoginModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
    loginActions: PropTypes.shape({
      resetLogin: PropTypes.func,
    }),
    userLogin: PropTypes.shape({
      loaded: PropTypes.bool,
    }),
  };

  state = {
    emailUsernameValid: null,
    passwordValid: null,
    formValid: null,
    formValues: {
      emailUsername: '',
      password: '',
    },
  };

  componentWillUnmount() {
    const { loaded } = this.props.userLogin;
    const { resetLogin } = this.props.loginActions;

    if (loaded) resetLogin();
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
    const { formValid, formValues } = this.state;

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
              <PasswordInput setPasswordValidation={this.setPasswordValid} />
              <LoginButton
                formValid={formValid}
                formValues={formValues}
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
