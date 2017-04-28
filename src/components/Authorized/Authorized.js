// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// actions
import * as getUserActions from 'ducks/modules/user/getUser';

@connect(
  state => ({ getUser: state.app.user.getUser }),
  getUserActions,
)
class Authorized extends Component {
  static propTypes = {
    children: PropTypes.element,
    getUser: PropTypes.shape({
      loaded: PropTypes.bool,
      user: PropTypes.shape({}),
    }),
  };

  state = {};

  render() {
    const { children } = this.props;
    const { loaded, user } = this.props.getUser;
    const authorized = loaded && !_.isEmpty(user);

    if (authorized) {
      return (
        <div>
          { children }
        </div>
      );
    }

    return null;
  }
}

export default Authorized;
