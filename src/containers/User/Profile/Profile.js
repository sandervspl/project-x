// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { fetchUserData } from 'ducks/modules/user/getUser';
import { fetchHostedParties } from 'ducks/modules/party/userParties';

// components
import Loader from 'components/Loader/Loader';
import UserProfile from './UserProfile/UserProfile';
import PartyButtonGroup from './PartyButtonGroup/PartyButtonGroup';
import PartyListGroup from './PartyListGroup/PartyListGroup';

// style
// import './Profile.styl';

// redux
function mapStateToProps(state) {
  return {
    getUser: state.app.user.getUser,
  };
}

class Profile extends Component {
  static propTypes = {
    getUser: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      user: PropTypes.shape({}),
      errorMessage: PropTypes.string,
    }),
    fetchHostedParties: PropTypes.func,
  };

  componentDidMount() {
    // fetch user's hosted parties
    this.props.fetchHostedParties();
  }

  render() {
    const { loading, error, errorMessage } = this.props.getUser;

    if (loading) {
      return <Loader color="purple" size="massive" active />;
    }

    if (error) {
      return <h3> { errorMessage } </h3>;
    }

    return (
      <section id="user-page">
        <UserProfile />
        <PartyButtonGroup />
        <PartyListGroup />
      </section>
    );
  }
}

export default connect(mapStateToProps, { fetchUserData, fetchHostedParties })(Profile);
