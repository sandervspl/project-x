// dependencies
import React, { PropTypes } from 'react';

// components
import Header from 'components/Header/Header';
import Settings from './Settings/Settings';

// style
import './Username.styl';

const Username = ({ firstName, lastName }) => (
  <div id="profile-username__container">
    <Header className="profile__username-text">{firstName} {lastName}</Header>
    <Settings />
  </div>
);

Username.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default Username;
