// dependencies
import React, { PropTypes } from 'react';

import NavigationBar from 'components/NavigationBar/NavigationBar';

// style
import './User.styl';

const User = ({ children }) => (
  <main className="page-fill">
    <NavigationBar />
    <div className="inner">
      { children }
    </div>
  </main>
);

User.propTypes = {
  children: PropTypes.element,
};

export default User;
