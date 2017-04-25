// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

// components
import Authorized from 'components/Authorized/Authorized';

// actions
import * as authActions from 'ducks/modules/auth';

// style
import './Profile.styl';

@connect(
  state => ({ auth: state.app.auth }),
  authActions,
)
class Profile extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
    fetchUserData: PropTypes.func,
  };

  componentWillMount() {
    const { fetchUserData } = this.props;
    const { user } = this.props.auth;

    // fetch user data if its missing
    if (!user) fetchUserData();
  }

  render() {
    const { user } = this.props.auth;

    if (!user) {
      return (
        <div>
          <h1>Profile</h1>
          <Loader className="purple-loader" active size="massive" />
        </div>
      );
    }

    const { firstName, lastName, username, email } = this.props.auth.user;
    return (
      <div>
        <h1>Profile</h1>
        <Authorized>
          <ul>
            <li>{firstName}</li>
            <li>{lastName}</li>
            <li>{username}</li>
            <li>{email}</li>
          </ul>
        </Authorized>
      </div>
    );
  }
}

export default Profile;
