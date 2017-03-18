// dependencies
import React from 'react';
import { Button } from 'semantic-ui-react';

// style
import './ButtonGroup.styl';

const ButtonGroup = () => (
  <div className="button-group">
    <h3>Sign in to continue</h3>
    <Button color="purple">Create account</Button>
    <Button basic inverted>Sign in</Button>
  </div>
);

export default ButtonGroup;
