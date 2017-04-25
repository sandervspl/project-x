// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

// components
import Authorized from 'components/Authorized/Authorized';

// actions
import * as authActions from 'ducks/modules/auth';

// style
import './User.styl';

@connect(
  state => ({ auth: state.app.auth }),
  authActions,
)
class User extends Component {
  static propTypes = {
    children: PropTypes.element,
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

  state = {
    load: false,
  };

  componentWillMount() {
    const { fetchUserData } = this.props;
    const { user } = this.props.auth;

    if (!user) {
      this.setState({ load: true });

      fetchUserData()
        .then(this.setState({ load: false }));
    }
  }

  render() {
    const { children } = this.props;
    const { user } = this.props.auth;
    const { load } = this.state;

    if (load || !user) {
      return (
        <div className="page-fill">
          <Dimmer>
            <Loader active />
            { children }
          </Dimmer>
        </div>
      );
    }

    const { firstName, lastName, username, email } = this.props.auth.user;
    return (
      <div>
        { children }
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

export default User;
