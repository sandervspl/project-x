// dependencies
import React, { PropTypes } from 'react';

// components
import { Button } from 'semantic-ui-react';

// style
import './ButtonGroup.styl';

const ButtonGroup = ({ setModalOpen }) => (
  <div className="button-group">
    <h3>Sign in to continue</h3>
    <Button color="purple" className="create-account" onClick={() => setModalOpen('signup', true)}>Create account</Button>
    <Button basic inverted onClick={() => setModalOpen('signin', true)}>Sign in</Button>
  </div>
);

ButtonGroup.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};

export default ButtonGroup;
