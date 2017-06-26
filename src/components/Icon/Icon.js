// dependencies
import React, { PropTypes } from 'react';

// style
import './Icon.styl';

const PxIcon = ({ name, color, size }) => (
  <i className={`fa fa-${name} px-icon px-icon--${color} px-icon--${size}`} aria-hidden="true" />
);

PxIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['purple', 'purple-medium', 'purple-light', 'black', 'white']),
  size: PropTypes.oneOf(['small', 'normal', 'big']),
};

PxIcon.defaultProps = {
  color: 'black',
  size: 'normal',
};

export default PxIcon;
