// dependencies
import React, { Component, PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// components
import InputError from 'components/InputError/InputError';
import PasswordInput from './PasswordInput';


class PasswordsGroup extends Component {
  static propTypes = {
    validatePasswords: PropTypes.func.isRequired,
    passwordsValid: PropTypes.bool,
  };

  state = {
    password1Valid: null,
    password2Valid: null,
    password1Value: null,
    password2Value: null,
  };

  // required password length
  requiredLength = 8;

  validatePassword = (isValid, id, value) => {
    this.setState({
      [`password${id}Valid`]: isValid,
      [`password${id}Value`]: value,
    }, this.passwordsAreValid);
  }

  passwordsAreValid = () => {
    const { validatePasswords } = this.props;
    const { password1Valid, password2Valid, password1Value, password2Value } = this.state;

    if (password1Valid !== null && password2Valid !== null) {
      const passwordsAreValid = (
        password1Valid && password2Valid && (password1Value === password2Value)
      );
      validatePasswords(passwordsAreValid);
    }
  }

  checkPasswordLength = password => password.length < this.requiredLength;

  render() {
    const { password1Value, password1Valid, password2Valid } = this.state;
    const { passwordsValid } = this.props;

    // validation
    const passwordsNotEqual = (passwordsValid !== null && !passwordsValid);
    const pw1TooShort = (password1Value !== null && this.checkPasswordLength(password1Value));
    const pw2Valid = (password2Valid !== null && password2Valid && !passwordsNotEqual);

    return (
      <div>
        <Form.Field>
          <PasswordInput
            fieldId="1"
            validatePassword={this.validatePassword}
            requiredLength={this.requiredLength}
            isValid={password1Valid}
            placeholder="Password"
            name="password"
          />
          { pw1TooShort && <InputError>Should be at least 8 characters long.</InputError> }
        </Form.Field>
        <Form.Field>
          <PasswordInput
            fieldId="2"
            validatePassword={this.validatePassword}
            requiredLength={this.requiredLength}
            isValid={pw2Valid}
            placeholder="Verify password"
            name="verify-password"
          />
          { passwordsNotEqual && <InputError>Passwords do not match.</InputError> }
        </Form.Field>
      </div>
    );
  }
}

export default PasswordsGroup;
