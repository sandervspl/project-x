// dependencies
import React, { PropTypes } from 'react';

// style
import './Icon.styl';

const PxIcon = ({ name, color, size, className, disabled }) => (
  <i
    className={`fa fa-${name} px-icon px-icon--${color} px-icon--${size}
     ${disabled ? 'px-icon--disabled' : ''} ${className}`} aria-hidden="true"
  />
);

PxIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['purple', 'purple-medium', 'purple-light', 'black', 'white']),
  size: PropTypes.oneOf(['small', 'normal', 'big']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

PxIcon.defaultProps = {
  color: 'black',
  size: 'normal',
  className: '',
  disabled: false,
};

export default PxIcon;
