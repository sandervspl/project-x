// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import * as RegisterActions from 'ducks/modules/register';

@connect(
  state => ({ register: state.allReducers.register }),
  RegisterActions,
)
class NextButton extends Component {
  static propTypes = {
    toRegisterPage: PropTypes.func,
    register: PropTypes.shape({
      loginFormValid: PropTypes.bool,
    }),
  };

  state = {
    enabled: false,
  };

  componentWillReceiveProps(nextProps) {
    const { loginFormValid } = nextProps.register;
    const { enabled } = this.state;

    if (loginFormValid !== enabled) {
      this.setState({ enabled: loginFormValid });
    }
  }

  onClick = (e) => {
    const { toRegisterPage } = this.props;
    const { loginFormValid } = this.props.register;

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
