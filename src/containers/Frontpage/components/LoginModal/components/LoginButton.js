// dependencies
import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

const LoginButton = ({ formValid }) => {
  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <Button
      color="purple"
      className="signin-btn big-btn"
      id="px-signin-btn"
      onClick={handleClick}
      fluid
      disabled={!formValid}
    >
      Sign in
    </Button>
  );
};

LoginButton.propTypes = {
  formValid: PropTypes.bool,
};

export default LoginButton;
