// dependencies
import React, { PropTypes } from 'react';
import cx from 'classnames';

// style
import './Icon.styl';

const Icon = ({ name, color, size, className, disabled, noSpacing }) => {
  const clsName = cx(
    'fa',
    `fa-${name}`,
    'px-icon',
    `px-icon--${color}`,
    `px-icon--${size}`,
    {
      'px-icon--disabled': disabled,
      'px-icon--no-spacing': noSpacing,
    },
    className,
  );

  return (
    <i className={clsName} aria-hidden="true" />
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
