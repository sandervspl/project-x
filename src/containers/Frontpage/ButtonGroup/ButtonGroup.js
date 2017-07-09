// dependencies
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

// components
import Button from 'components/Button/Button';

// routes
import routes from 'routes/routes';

// style
import './ButtonGroup.styl';

const RegisterButton = ({ onClick }) => (
  <Button
    color="purple"
    className="create-account-btn"
    fontSize="normal"
    onClick={() => onClick('signup', true)}
    // onClick={() => browserHistory.push(routes.register.register)}
  >
    CREATE ACCOUNT
  </Button>
);
RegisterButton.propTypes = {
  onClick: PropTypes.func,
};

const LoginButton = () => (
  <Button
    inverted
    transparent
    color="white"
    className="login-btn"
    fontSize="normal"
    // onClick={() => toggleModal('signin', true)}
    onClick={() => browserHistory.push(routes.login.login)}
  >
    SIGN IN
  </Button>
);

const ButtonGroup = ({ toggleModal }) => (
  <div className="button-group">
    <h3>Sign in to continue</h3>
    <div className="button-group-inner">
      <RegisterButton onClick={toggleModal} />
      <LoginButton />
    </div>
  </div>
);

ButtonGroup.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default ButtonGroup;
