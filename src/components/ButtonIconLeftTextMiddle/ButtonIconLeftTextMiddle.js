// dependencies
import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';

// style
import './ButtonIconLeftTextMiddle.styl';

const ButtonIconLeftTextMiddle = ({ children, icon, className, id }) => (
  <Button fluid className={`btn btn--iltm ${className}`} id={id}>
    <i className={`fa fa-${icon}`} aria-hidden="true" />
    { children }
  </Button>
);

ButtonIconLeftTextMiddle.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

ButtonIconLeftTextMiddle.defaultValues = {
  id: '',
  className: '',
};

export default ButtonIconLeftTextMiddle;
