// dependencies
import React, { PropTypes } from 'react';

// style
import './Icon.styl';

const Icon = ({ name, color, size, className, disabled, noSpacing }) => {
  let clsName = '';
  if (disabled) clsName += ' px-icon--disabled';
  if (noSpacing) clsName += ' px-icon--no-spacing';
  clsName += ` ${className}`;

  return (
    <i
      className={`fa fa-${name} px-icon px-icon--${color} px-icon--${size} ${clsName}`}
      aria-hidden="true"
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['purple', 'purple-medium', 'purple-light', 'black', 'white', 'grey-medium']),
  size: PropTypes.oneOf(['small', 'normal', 'big']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  noSpacing: PropTypes.bool,
};

Icon.defaultProps = {
  color: 'black',
  size: 'normal',
  className: '',
  disabled: false,
  noSpacing: false,
};

export default Icon;
