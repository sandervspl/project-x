// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import InputError from 'components/InputError/InputError';

// style
// import './LoginFormError.styl';

const LoginFormError = ({ userLogin, getUser }) => {
  const { error: loginError, errorMessage: loginErrorMsg } = userLogin;
  const { error: getUserError, errorMessage: getUserErrorMsg } = getUser;

  return (
    <div>
      { loginError && <InputError> {loginErrorMsg} </InputError> }
      { getUserError && <InputError> {getUserErrorMsg} </InputError> }
    </div>
  );
};

LoginFormError.propTypes = {
  userLogin: PropTypes.shape({}),
  getUser: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    userLogin: state.app.user.userLogin,
    getUser: state.app.user.getUser,
  };
}

export default connect(mapStateToProps)(LoginFormError);
