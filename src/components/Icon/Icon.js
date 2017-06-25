// dependencies
import React, { PropTypes } from 'react';
import { Icon } from 'semantic-ui-react';

// style
import './Icon.styl';

const PxIcon = ({ name, color, size }) => (
  <Icon name={name} className={`px-icon px-${color}`} size={size} />
);

PxIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['purple', 'purple-medium', 'purple-light', 'black', 'white']),
  size: PropTypes.oneOf(['small', 'large', 'big']),
};

PxIcon.defaultProps = {
  color: 'black',
  size: 'large',
};

export default PxIcon;
