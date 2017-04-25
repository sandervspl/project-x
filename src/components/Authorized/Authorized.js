// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import * as authActions from 'ducks/modules/auth';

@connect(
  state => ({ auth: state.app.auth }),
  authActions,
)
class Authorized extends Component {
  static propTypes = {
    children: PropTypes.element,
    auth: PropTypes.shape({
      user: PropTypes.shape({}),
    }),
  };

  state = {};

  render() {
    const { children } = this.props;
    const { user } = this.props.auth;
    const authorized = user !== 'undefined' && user !== null;

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
