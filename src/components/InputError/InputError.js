// dependencies
import React, { PropTypes } from 'react';
import { Label, Icon } from 'semantic-ui-react';

// style
import './InputError.styl';

const InputError = ({ children, icon, block }) => {
  const iconName = icon || 'warning circle';

  if (block) {
    return (
      <div className="input-error">
        <Icon name={iconName} />
        { children }
      </div>
    );
  }

  return (
    <Label className="input-error">
      <Icon name={iconName} />
      { children }
    </Label>
  );
};

InputError.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any.isRequired,
  icon: PropTypes.string,
  block: PropTypes.bool,
};

InputError.defaultProps = {
  block: false,
};

export default InputError;
