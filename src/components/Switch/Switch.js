// dependencies
import React, { PropTypes } from 'react';
import cx from 'classnames';

// style
import './Switch.styl';

const Switch = ({ isOn, onClick }) => (
  <div
    className={cx(
      'switch-container',
      { on: isOn },
    )}
    onClick={onClick}
  >
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
