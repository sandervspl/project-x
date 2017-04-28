// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import * as createActions from 'ducks/modules/user/create';

@connect(
  state => ({ create: state.app.user.userCreate }),
  createActions,
)
class NextButton extends Component {
  static propTypes = {
    toRegisterPage: PropTypes.func,
    create: PropTypes.shape({
      loginFormValid: PropTypes.bool,
    }),
  };

  state = {
    enabled: false,
  };

  componentWillReceiveProps(nextProps) {
    const { loginFormValid } = nextProps.create;
    const { enabled } = this.state;

    if (loginFormValid !== enabled) {
      this.setState({ enabled: loginFormValid });
    }
  }

  onClick = (e) => {
    const { toRegisterPage } = this.props;
    const { loginFormValid } = this.props.create;

    e.preventDefault();

    if (loginFormValid) toRegisterPage(2);
  };

  render() {
    const { enabled } = this.state;

    return (
      <Button
        color="purple"
        className="big-btn"
        id="next-btn"
        onClick={this.onClick}
        fluid
        disabled={!enabled}
      >
        Next
      </Button>
    );
  }
}

export default NextButton;
