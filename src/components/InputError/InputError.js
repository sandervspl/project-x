// dependencies
import React, { PropTypes } from 'react';
import { Label, Icon } from 'semantic-ui-react';

// style
import './InputError.styl';

const InputError = ({ children, icon }) => {
  const iconName = icon || 'warning circle';

  return (
    <Label className="input-error">
      <Icon name={iconName} />
      { children }
    </Label>
  );
};

InputError.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default InputError;
