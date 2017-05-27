// dependencies
import React, { PropTypes } from 'react';

// style
import './SmallServiceLoginBtn.styl';

const SmallServiceLoginBtn = ({ serviceName }) => (
  <a href="#" className="small-login-btn-link">
    <div className={`small-login-btn ${serviceName}`}>
      <i className={`fa fa-${serviceName}`} aria-hidden="true" />
      <span>{serviceName}</span>
    </div>
  </a>
);

SmallServiceLoginBtn.propTypes = {
  serviceName: PropTypes.string.isRequired,
};

export default SmallServiceLoginBtn;
