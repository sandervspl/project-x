// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

const PasswordInput = ({ fieldId, isValid, validatePassword, requiredLength, placeholder }) => {
  function onChange(e) {
    const el = e.target;

    if (el) {
      const val = el.value;

      // minimum length of password
      const minLength = requiredLength || 1;
      const valid = val.length >= minLength;

      validatePassword(valid, fieldId, val);
    }
  }

  return (
    <Form.Input
      type="password"
      placeholder={placeholder || ''}
      icon={isValid ? 'check' : 'key'}
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
  placeholder: PropTypes.string,
};

export default PasswordInput;
