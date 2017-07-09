// dependencies
import React from 'react';
import { connect } from 'react-redux';

// assets
import defaultImg from 'assets/images/avatar_default.png';

// style
import './Avatar.styl';

// TODO: Fix img src
const Avatar = () => (
  <div className="profile-avatar-container" style={{ backgroundImage: `url(${defaultImg})` }} />
);

function mapStateToProps(state) {
  return {
    getUser: state.app.user.getUser,
  };
}

export default connect(mapStateToProps)(Avatar);
