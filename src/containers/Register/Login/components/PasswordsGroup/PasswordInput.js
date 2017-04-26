// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import _ from 'lodash';

const PasswordInput = ({ fieldId,
                         isValid,
                         validatePassword,
                         requiredLength,
                         placeholder,
                         name,
}) => {
  const handleChange = _.debounce((e) => {
    const el = e.target;

    if (el) {
      const val = el.value;

      // minimum length of password
      const minLength = requiredLength || 1;
      const valid = val.length >= minLength;

      validatePassword(valid, fieldId, val);
    }
  }, 750);

  return (
    <Form.Input
      type="password"
      placeholder={placeholder || ''}
      name={name || ''}
      icon={isValid ? 'check' : 'key'}
      className="password"
      onChange={(e) => { e.persist(); handleChange(e); }}
    />
  );
};

PasswordInput.propTypes = {
  fieldId: PropTypes.string.isRequired,
  validatePassword: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  requiredLength: PropTypes.number,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

export default PasswordInput;
