// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button } from 'semantic-ui-react';

// actions
import * as authActions from 'ducks/modules/auth';

@connect(
  state => ({ auth: state.app.auth }),
  authActions,
)
class LoginButton extends Component {
  static propTypes = {
    formValid: PropTypes.bool,
    formValues: PropTypes.shape({}),
    login: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      loggingIn: PropTypes.bool,
    }),
    setLoginFailed: PropTypes.func,
  };

  handleClick = (e) => {
    e.preventDefault();

    const { login, formValues, setLoginFailed } = this.props;

    login(formValues)
      .then((result) => {
        if (result.status < 400) {
          setLoginFailed(false);
          browserHistory.push('/user');
        } else {
          setLoginFailed(true);
        }
      });
  }

  render() {
    const { formValid } = this.props;
    const { loggingIn } = this.props.auth;

    return (
      <Button
        color="purple"
        className="signin-btn big-btn"
        id="px-signin-btn"
        onClick={this.handleClick}
        fluid
        disabled={!formValid}
        loading={loggingIn}
      >
        Sign in
      </Button>
    );
  }
}

export default LoginButton;
