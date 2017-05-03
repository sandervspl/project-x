// dependencies
import React, { PropTypes } from 'react';

// style
import './User.styl';

const User = ({ children }) => (
  <main className="page-fill flow">
    <div className="inner">
      { children }
    </div>
  </main>
);

User.propTypes = {
  children: PropTypes.element,
};

export default User;
