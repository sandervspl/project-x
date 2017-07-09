// dependencies
import React, { PureComponent, PropTypes } from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

// actions
import { resetLogin } from 'ducks/modules/user/login';

// components
import FooterAuth from 'components/FooterAuth/FooterAuth';
import LoginModalContent from './LoginModalContent/LoginModalContent';

// style
// import './LoginModal.styl';

class LoginModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    resetLogin: PropTypes.func,
    userLogin: PropTypes.shape({
      loaded: PropTypes.bool,
    }),
  };

  static childContextTypes = {
    setEmailUsernameValidation: PropTypes.func,
    setPasswordValid: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      emailUsernameValid: null,
      passwordValid: null,
      formValid: null,
      formValues: {
        emailUsername: '',
        password: '',
      },
    };
  }

  getChildContext() {
    return {
      setEmailUsernameValidation: this.setEmailUsernameValidation,
      setPasswordValid: this.setPasswordValid,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { emailUsernameValid, passwordValid } = nextState;
    this.isFormValid(emailUsernameValid, passwordValid);
  }

  componentWillUnmount() {
    const { loaded } = this.props.userLogin;

    if (loaded) this.props.resetLogin();
  }

  setEmailUsernameValidation = (valid, value) => {
    this.setState({
      emailUsernameValid: valid,
      formValues: {
        ...this.state.formValues,
        emailUsername: value,
      },
    });
  };

  setPasswordValid = (valid, value) => {
    this.setState({
      passwordValid: valid,
      formValues: {
        ...this.state.formValues,
        password: value,
      },
    });
  };

  isFormValid = (emailUsernameValid, passwordValid) => {
    const formValid = emailUsernameValid && passwordValid;
    this.setState({ formValid });
  };

  render() {
    const { isOpen, toggleModal } = this.props;
    const { formValid, formValues } = this.state;

    return (
      <Modal
        size="small"
        open={isOpen}
        onClose={() => toggleModal('signin', false)}
        closeIcon="close"
        className="px-modal login-modal"
      >
        <Modal.Header>Sign in to start your party</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginModalContent
              formValid={formValid}
              formValues={formValues}
            />
          </Modal.Description>
        </Modal.Content>
        <FooterAuth type="signup" setModalOpen={toggleModal} />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    userLogin: state.app.user.userLogin,
    getUser: state.app.user.getUser,
  };
}

export default connect(mapStateToProps, { resetLogin })(LoginModal);
