// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

// actions
import * as getUserActions from 'ducks/modules/user/getUser';
import * as userPartiesActions from 'ducks/modules/party/userParties';

// helpers
import { isLoggedIn } from 'helpers/auth';

// components
import Loader from 'components/Loader/Loader';
import UserProfile from './UserProfile/UserProfile';
import PartyButtonGroup from './PartyButtonGroup/PartyButtonGroup';
import PartyListGroup from './PartyListGroup/PartyListGroup';

// style
import './Profile.styl';

class Profile extends Component {
  static propTypes = {
    getUser: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      user: PropTypes.shape({}),
      errorMessage: PropTypes.string,
    }),
    getUserActions: PropTypes.shape({
      fetchUserData: PropTypes.func,
    }),
    userPartiesActions: PropTypes.shape({
      fetch: PropTypes.func,
    }),
  };

  async componentDidMount() {
    const { fetchUserData } = this.props.getUserActions;
    const { user } = this.props.getUser;

    const isAuth = await isLoggedIn();

    // fetch user data if its missing
    if (isAuth && _.isEmpty(user)) {
      fetchUserData();
    }

    // fetch parties
    this.props.userPartiesActions.fetch();
  }

  render() {
    const { loading, error, errorMessage } = this.props.getUser;

    if (loading) {
      return <Loader color="purple" size="massive" active />;
    }

    if (error) {
      return <h3> { errorMessage } </h3>;
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

function mapStateToProps(state) {
  return {
    userParties: state.app.party.userParties,
    getUser: state.app.user.getUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userPartiesActions: bindActionCreators(userPartiesActions, dispatch),
    getUserActions: bindActionCreators(getUserActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
