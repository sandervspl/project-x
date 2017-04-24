// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { isEmpty } from 'validator';

const PasswordInput = ({ setPasswordValidation }) => {
  function onChange(e) {
    const value = e.target.value;
    const valid = !isEmpty(value);
    setPasswordValidation(valid, value);
  }

  return (
    <Form.Input
      type="password"
      placeholder="Password"
      id="px-password-field"
      name="password"
      onChange={onChange}
    />
  );
};

PasswordInput.propTypes = {
  setPasswordValidation: PropTypes.func.isRequired,
};

export default PasswordInput;
