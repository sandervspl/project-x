// dependencies
import React, { PropTypes } from 'react';

// components
import { Button } from 'semantic-ui-react';

// style
import './ButtonGroup.styl';

const ButtonGroup = ({ openLogin, openRegister }) => (
  <div className="button-group">
    <h3>Sign in to continue</h3>
    <Button color="purple" className="create-account" onClick={openRegister}>Create account</Button>
    <Button basic inverted onClick={openLogin}>Sign in</Button>
  </div>
);

ButtonGroup.propTypes = {
  openLogin: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired,
};

export default ButtonGroup;
