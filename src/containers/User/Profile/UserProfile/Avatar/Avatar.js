// dependencies
import React from 'react';
import { connect } from 'react-redux';

// actions
import * as getUserActions from 'ducks/modules/user/getUser';

// style
import './Avatar.styl';

const Avatar = () => (
  <div className="profile-avatar-container">
    <img src="" alt="user avatar" />
  </div>
);

function mapStateToProps(state) {
  return {
    getUser: state.app.user.getUser,
  };
}

export default connect(mapStateToProps, getUserActions)(Avatar);
