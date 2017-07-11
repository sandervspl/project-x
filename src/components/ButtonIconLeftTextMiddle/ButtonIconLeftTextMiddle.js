// dependencies
import React, { PropTypes } from 'react';
import { noop } from 'lodash';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

// style
import './ButtonIconLeftTextMiddle.styl';

const ButtonIconLeftTextMiddle = ({ children, icon, iconColor, className, onClick, color }) => (
  <Button
    className={`btn btn--iltm ${className}`}
    color={color}
    onClick={onClick}
  >
    <Icon name={icon} color={iconColor} />
    { children }
  </Button>
);

ButtonIconLeftTextMiddle.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.string,
  iconColor: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

ButtonIconLeftTextMiddle.defaultProps = {
  id: '',
  className: '',
  onClick: noop,
};

export default ButtonIconLeftTextMiddle;
