// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Button from 'components/Button/Button';
import PageSection from 'components/PageSection/PageSection';

// actions
import * as loginActions from 'ducks/modules/user/login';
import * as userActions from 'ducks/modules/user/getUser';

// style
import './LoginButton.styl';

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
    loginActions: PropTypes.shape({
      loginProcess: PropTypes.func,
    }),
  };

  handleClick = (e) => {
    e.preventDefault();
    const { formValues } = this.props;
    const { loginProcess } = this.props.loginActions;

    loginProcess(formValues);
  };

  render() {
    const { formValid } = this.props;
    const { loading, loaded } = this.props.userLogin;

    return (
      <PageSection>
        <Button
          color="purple"
          onClick={this.handleClick}
          fontSize="normal"
          className="login-modal__btn"
          disabled={!formValid || loading || loaded}
          loading={loading || loaded}
        >
          SIGN IN
        </Button>
      </PageSection>
    );
  }
}

export default LoginButton;
