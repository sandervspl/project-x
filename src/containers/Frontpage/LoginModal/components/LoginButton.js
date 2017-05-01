// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';

// actions
import * as loginActions from 'ducks/modules/user/login';
import * as userActions from 'ducks/modules/user/getUser';

@connect(
  state => ({
    userLogin: state.app.user.userLogin,
    getUser: state.app.user.getUser,
  }),
  dispatch => ({
    loginActions: bindActionCreators(loginActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }),
)
class LoginButton extends Component {
  static propTypes = {
    formValid: PropTypes.bool,
    formValues: PropTypes.shape({}),
    userLogin: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }),
    userActions: PropTypes.shape({
      resetUser: PropTypes.func,
    }),
    loginActions: PropTypes.shape({
      loginProcess: PropTypes.func,
      resetLogin: PropTypes.func,
    }),
  };

  componentDidMount() {
    const { loaded } = this.props.userLogin;
    const { resetLogin } = this.props.loginActions;

    if (loaded) resetLogin();
  }

  handleClick = (e) => {
    e.preventDefault();
    const { formValues } = this.props;
    const { resetUser } = this.props.userActions;
    const { loginProcess } = this.props.loginActions;

    resetUser();
    loginProcess(formValues);
  };

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
