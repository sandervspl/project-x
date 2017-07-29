// dependencies
import React, { PropTypes } from 'react';

// components
import FormInput from 'components/FormInput/FormInput';

const PasswordInput = ({
  onChange,
  isValid,
  placeholder,
  name,
}) => (
  <FormInput
    type="password"
    placeholder={placeholder}
    name={name}
    icon={isValid ? 'check' : 'key'}
    className="password"
    onChange={onChange}
  />
);

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

export default PasswordInput;
