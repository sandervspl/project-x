// dependencies
import React, { PropTypes } from 'react';

// components
import PageFill from 'components/PageFill/PageFill';

// style
// import './User.styl';

const User = ({ children }) => (
  <PageFill flow>
    { children }
  </PageFill>
);

User.propTypes = {
  children: PropTypes.element,
};

export default User;
