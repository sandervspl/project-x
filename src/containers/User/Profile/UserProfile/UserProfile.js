// dependencies
import React from 'react';
import { connect } from 'react-redux';
import { user as userProps } from 'helpers/customProps';

// components
import Avatar from './Avatar/Avatar';
import Username from './Username/Username';
import ProfileData from './ProfileData/ProfileData';

// style
import './UserProfile.styl';

function mapStateToProps(state) {
  return {
    user: state.app.user.getUser.user,
  };
}

const UserProfile = ({ user }) => (
  <section id="user-profile">
    <section id="user-profile-top">
      <Avatar avatar={user.avatarUrl} />
      <Username firstName={user.firstName} lastName={user.lastName} />
    </section>
    <section id="user-profile-bottom">
      <ProfileData />
    </section>
  </section>
);

UserProfile.propTypes = {
  user: userProps.propTypes,
};

export default connect(mapStateToProps)(UserProfile);
