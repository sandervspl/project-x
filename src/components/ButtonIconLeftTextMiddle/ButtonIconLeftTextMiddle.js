// dependencies
import React, { PropTypes } from 'react';
import { noop } from 'lodash';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';

// style
import './ButtonIconLeftTextMiddle.styl';

const ButtonIconLeftTextMiddle = props => (
  <Button
    className={['btn-iltm', props.className].join(' ')}
    color={props.color}
    inverted={props.inverted}
    onClick={props.onClick}
  >
    <Icon name={props.icon} color={props.iconColor} />
    { props.children }
  </Button>
);

ButtonIconLeftTextMiddle.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.string,
  iconColor: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
};

ButtonIconLeftTextMiddle.defaultProps = {
  id: '',
  className: '',
  onClick: noop,
};

export default ButtonIconLeftTextMiddle;
