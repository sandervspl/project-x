// dependencies
import React, { PropTypes } from 'react';

// components
import Button from 'components/Button/Button';

// style
import './ButtonGroup.styl';

const ButtonGroup = ({ toggleModal }) => (
  <div className="button-group">
    <h3>Sign in to continue</h3>
    <div className="button-group-inner">
      <Button
        color="purple"
        className="create-account-btn"
        fontSize="normal"
        onClick={() => toggleModal('signup', true)}
      >
        CREATE ACCOUNT
      </Button>
      <Button
        inverted
        transparent
        color="white"
        className="login-btn"
        fontSize="normal"
        onClick={() => toggleModal('signin', true)}
      >
        SIGN IN
      </Button>
    </div>
  </div>
);

ButtonGroup.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default ButtonGroup;
