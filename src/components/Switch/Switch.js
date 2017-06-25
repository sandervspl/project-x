// dependencies
import React, { PropTypes } from 'react';

// style
import './Switch.styl';

const Switch = ({ isOn, onClick }) => (
  <div className={`switch-container ${isOn ? 'on' : ''}`} onClick={onClick}>
    <div className="switch-inner" />
  </div>
);

Switch.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOn: PropTypes.bool,
};

Switch.defaultValues = {
  isOn: false,
};

export default Switch;
