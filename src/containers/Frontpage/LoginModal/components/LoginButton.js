// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

// actions
import * as loginActions from 'ducks/modules/user/login';

@connect(
  state => ({ userLogin: state.app.user.userLogin }),
  loginActions,
)
class LoginButton extends Component {
  static propTypes = {
    formValid: PropTypes.bool,
    formValues: PropTypes.shape({}),
    loginProcess: PropTypes.func,
    userLogin: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }),
  };

  handleClick = (e) => {
    e.preventDefault();
    const { loginProcess, formValues } = this.props;
    loginProcess(formValues);
  }

  render() {
    const { formValid } = this.props;
    const { loading, loaded } = this.props.userLogin;

    return (
      <Button
        color="purple"
        className="signin-btn big-btn"
        id="px-signin-btn"
        onClick={this.handleClick}
        fluid
        disabled={!formValid || loading || loaded}
        loading={loading}
      >
        Sign in
      </Button>
    );
  }
}

export default LoginButton;
