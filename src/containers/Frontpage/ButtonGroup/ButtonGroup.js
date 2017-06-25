// dependencies
import React, { PropTypes } from 'react';

// components
import { Button } from 'semantic-ui-react';

// style
import './ButtonGroup.styl';

const ButtonGroup = ({ toggleModal }) => (
  <div className="button-group">
    <h3>Sign in to continue</h3>
    <Button
      color="purple"
      className="create-account"
      onClick={() => toggleModal('signup', true)}
    >
      Create account
    </Button>
    <Button
      basic
      inverted
      id="sign-in-btn"
      onClick={() => toggleModal('signin', true)}
    >
      Sign in
    </Button>
  </div>
);

ButtonGroup.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default ButtonGroup;
