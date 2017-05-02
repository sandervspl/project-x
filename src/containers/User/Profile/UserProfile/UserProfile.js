// dependencies
import React, { PropTypes } from 'react';

// components
import Avatar from './Avatar/Avatar';
import Username from './Username/Username';
import ProfileData from './ProfileData/ProfileData';

// style
import './UserProfile.styl';

const UserProfile = ({ user }) => (
  <section id="user-profile">
    <section id="user-profile-top">
      <Avatar />
      <Username firstName={user.firstName} lastName={user.lastName} />
    </section>
    <section id="user-profile-bottom">
      <ProfileData />
    </section>
  </section>
);

UserProfile.propTypes = {
  user: PropTypes.shape({}),
};

export default UserProfile;
