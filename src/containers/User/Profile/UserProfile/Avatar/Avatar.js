// dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// actions
import * as getUserActions from 'ducks/modules/user/getUser';

// style
import './Avatar.styl';

@connect(
  state => ({ getUser: state.app.user.getUser }),
  getUserActions,
)
class Avatar extends Component {
  static propTypes = {};

  state = {};

  render() {
    return (
      <div className="profile-avatar-container">
        <img src="" alt="user avatar" />
      </div>
    );
  }
}

export default Avatar;
