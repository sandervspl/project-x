// dependencies
import React, { Component, PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { isEmpty } from 'validator';
import { connect } from 'react-redux';

// components
import InputError from 'components/InputError/InputError';

@connect(state => ({
  userLogin: state.app.user.userLogin,
  getUser: state.app.user.getUser,
}))
class PasswordInput extends Component {
  static propTypes = {
    setPasswordValidation: PropTypes.func.isRequired,
    userLogin: PropTypes.shape({
      // error: PropTypes.bool,
      // errorMessage: PropTypes.string,
    }),
    getUser: PropTypes.shape({
      // error: PropTypes.bool,
      // errorMessage: PropTypes.string,
    }),
  };

  handleChange = (e) => {
    const value = e.target.value;
    const valid = !isEmpty(value);
    this.props.setPasswordValidation(valid, value);
  };

  render() {
    const { userLogin, getUser } = this.props;
    const loginError = userLogin.error;
    const loginErrorMsg = userLogin.errorMessage;
    const userError = getUser.error;
    const userErrorMsg = getUser.errorMessage;

    return (
      <Form.Field>
        <Form.Input
          type="password"
          placeholder="Password"
          id="px-password-field"
          name="password"
          onChange={this.handleChange}
        />
        { loginError && <InputError>{loginErrorMsg}</InputError> }
        { userError && <InputError>{userErrorMsg}</InputError> }
      </Form.Field>
    );
  }
}

export default PasswordInput;
