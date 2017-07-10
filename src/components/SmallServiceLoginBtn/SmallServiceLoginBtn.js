// dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './SmallServiceLoginBtn.styl';

const SmallServiceLoginBtn = ({ serviceName }) => (
  <Link to="#" className="small-login-btn-link">
    <button className={`small-login-btn ${serviceName}`}>
      <TextWithIcon
        icon={serviceName}
        iconColor="white"
        iconSize="small"
      >
        {serviceName}
      </TextWithIcon>
    </button>
  </Link>
);

SmallServiceLoginBtn.propTypes = {
  serviceName: PropTypes.string.isRequired,
};

export default SmallServiceLoginBtn;
