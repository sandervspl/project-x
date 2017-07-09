// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import Button from 'components/Button/Button';
import PageSection from 'components/PageSection/PageSection';

// actions
import { loginProcess } from 'ducks/modules/user/login';

// style
import './LoginButton.styl';

class LoginButton extends Component {
  static propTypes = {
    formValid: PropTypes.bool,
    formValues: PropTypes.shape({}),
    userLogin: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }),
    loginProcess: PropTypes.func,
  };

  handleClick = (e) => {
    e.preventDefault();
    const { formValues } = this.props;

    this.props.loginProcess(formValues);
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

function mapStateToProps(state) {
  return {
    userLogin: state.app.user.userLogin,
    getUser: state.app.user.getUser,
  };
}

export default connect(mapStateToProps, { loginProcess })(LoginButton);
