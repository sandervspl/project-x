// dependencies
import React, { PropTypes } from 'react';

// components
import Settings from './Settings/Settings';

// style
import './Username.styl';

const Username = ({ firstName, lastName }) => (
  <div id="profile-username-container">
    <h3 className="username">{firstName} {lastName}</h3>
    <Settings />
  </div>
);

Username.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default Username;
