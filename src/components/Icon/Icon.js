// dependencies
import React, { PropTypes } from 'react';

// style
import './Icon.styl';

const PxIcon = ({ name, color, size, className, disabled, noSpacing }) => {
  let classname = className;
  if (disabled) classname += ' px-icon--disabled';
  if (noSpacing) classname += ' px-icon--no-spacing';

  return (
    <i
      className={`fa fa-${name} px-icon px-icon--${color} px-icon--${size} ${classname}`}
      aria-hidden="true"
    />
  );
};

PxIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['purple', 'purple-medium', 'purple-light', 'black', 'white', 'grey-medium']),
  size: PropTypes.oneOf(['small', 'normal', 'big']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  noSpacing: PropTypes.bool,
};

PxIcon.defaultProps = {
  color: 'black',
  size: 'normal',
  className: '',
  disabled: false,
  noSpacing: false,
};

export default PxIcon;
