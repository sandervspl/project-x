// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

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
      load: PropTypes.bool,
      user: PropTypes.string,
    }),
    fetchUserData: PropTypes.func,
  };

  componentWillMount() {
    const { fetchUserData } = this.props;
    const { user } = this.props.auth;

    if (user === null) fetchUserData();
  }

  render() {
    const { children } = this.props;
    const { load, user } = this.props.auth;

    return (
      <div>
        {
          load &&
          <div>
            <Dimmer>
              <Loader active />
            </Dimmer>
          </div>
        }
        <h1>User: { user }</h1>
        { children }
      </div>
    );
  }
}

export default User;
