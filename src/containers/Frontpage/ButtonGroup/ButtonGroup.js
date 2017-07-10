// dependencies
import React from 'react';
import { browserHistory } from 'react-router';

// components
import Button from 'components/Button/Button';

// routes
import routes from 'routes/routes';

// style
import './ButtonGroup.styl';


const RegisterButton = () => (
  <Button
    color="purple"
    className="create-account-btn"
    fontSize="normal"
    onClick={() => browserHistory.push(routes.register.register)}
  >
    CREATE ACCOUNT
  </Button>
);


const LoginButton = () => (
  <Button
    inverted
    transparent
    color="white"
    className="login-btn"
    fontSize="normal"
    onClick={() => browserHistory.push(routes.login.login)}
  >
    SIGN IN
  </Button>
);


const ButtonGroup = () => (
  <div className="button-group">
    <h3>Sign in to continue</h3>
    <div className="button-group-inner">
      <RegisterButton />
      <LoginButton />
    </div>
  </div>
);

export default ButtonGroup;
