// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import _ from 'lodash';


// actions
import * as getUserActions from 'ducks/modules/user/getUser';

// helpers
import { isLoggedIn } from 'helpers/auth';

// components
import UserProfile from './UserProfile/UserProfile';
import PartyButtonGroup from './PartyButtonGroup/PartyButtonGroup';
import PartyListGroup from './PartyListGroup/PartyListGroup';

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
      user: PropTypes.shape({}),
    }),
    fetchUserData: PropTypes.func,
  };

  state = {};

  async componentDidMount() {
    const { fetchUserData } = this.props;
    const { user } = this.props.getUser;

    const isAuth = await isLoggedIn();

    // fetch user data if its missing
    if (isAuth && _.isEmpty(user)) {
      fetchUserData();
    }
  }

  render() {
    const { loading, error } = this.props.getUser;

    if (loading) {
      return <Loader className="purple-loader" active size="massive" />;
    }

    if (error) {
      return <h3>Something went wrong.</h3>;
    }

    const { user } = this.props.getUser;
    return (
      <section id="user-page">
        <UserProfile user={user} />
        <PartyButtonGroup />
        <PartyListGroup />
      </section>
    );
  }
}

export default Profile;
