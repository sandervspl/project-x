// dependencies
import React, { PropTypes } from 'react';

// components
import { Button } from 'semantic-ui-react';

// style
import './ButtonGroup.styl';

const ButtonGroup = ({ open }) => (
  <div className="button-group">
    <h3>Sign in to continue</h3>
    <Button color="purple" className="create-account">Create account</Button>
    <Button basic inverted onClick={open}>Sign in</Button>
  </div>
);

ButtonGroup.propTypes = {
  open: PropTypes.func.isRequired,
};

export default ButtonGroup;
