// dependencies
import React, { PropTypes } from 'react';

// style
import './User.styl';

const User = ({ children }) => (
  <div>
    <h1>User</h1>
    { children }
  </div>
);

User.propTypes = {
  children: PropTypes.element,
};

export default User;
