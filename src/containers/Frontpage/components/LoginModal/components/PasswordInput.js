// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { isEmpty } from 'validator';

// components
import InputError from 'components/InputError/InputError';

const PasswordInput = ({ setPasswordValidation, loginFailed, errorMsg }) => {
  function onChange(e) {
    const value = e.target.value;
    const valid = !isEmpty(value);
    setPasswordValidation(valid, value);
  }

  return (
    <Form.Field>
      <Form.Input
        type="password"
        placeholder="Password"
        id="px-password-field"
        name="password"
        onChange={onChange}
      />
      { loginFailed && <InputError>{errorMsg}</InputError> }
    </Form.Field>
  );
};

PasswordInput.propTypes = {
  setPasswordValidation: PropTypes.func.isRequired,
  loginFailed: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default PasswordInput;
