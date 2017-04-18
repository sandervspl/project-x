// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

const PasswordInput = ({ fieldId, isValid, validatePassword, requiredLength }) => {
  function onChange(e) {
    const el = e.target;

    if (el) {
      const val = el.value;

      // minimum length of password
      const minLength = requiredLength || 1;

      if (val.length < minLength) {
        validatePassword(false, fieldId, val);
      } else {
        validatePassword(true, fieldId, val);
      }
    }
  }

  return (
    <Form.Input
      type="password"
      placeholder="Password"
      icon={isValid ? 'check' : 'mail'}
      className="password"
      onChange={onChange}
    />
  );
};

PasswordInput.propTypes = {
  fieldId: PropTypes.string.isRequired,
  validatePassword: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  requiredLength: PropTypes.number,
};

export default PasswordInput;
