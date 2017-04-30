// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import _ from 'lodash';

// components
import Authorized from 'components/Authorized/Authorized';

// actions
import * as getUserActions from 'ducks/modules/user/getUser';

// style
import './Profile.styl';

@connect(
  state => ({ getUser: state.app.user.getUser }),
  getUserActions,
)
class Profile extends Component {
  static propTypes = {
    getUser: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
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
    const { user } = this.props.getUser;

    // fetch user data if its missing
    if (_.isEmpty(user)) {
      fetchUserData();
    }
  }

  render() {
    const { loading, error } = this.props.getUser;

    if (loading) {
      return (
        <div>
          <h1>Profile</h1>
          <Loader className="purple-loader" active size="massive" />
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <h1>Profile</h1>
          <h3>Something went wrong.</h3>
        </div>
      );
    }

    const { firstName, lastName, username, email } = this.props.getUser.user;
    return (
      <section>
        <h1>Profile</h1>
        <Authorized>
          <ul>
            <li>{firstName}</li>
            <li>{lastName}</li>
            <li>{username}</li>
            <li>{email}</li>
          </ul>
        </Authorized>
      </section>
    );
  }
}

export default Profile;
