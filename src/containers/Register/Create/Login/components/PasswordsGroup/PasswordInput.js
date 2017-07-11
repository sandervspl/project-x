// dependencies
import React, { PropTypes } from 'react';
import { debounce } from 'lodash';

// utils
import { getValueFromEvent } from 'utils/form';

// components
import FormInput from 'components/FormInput/FormInput';

const PasswordInput = ({
  onChange,
  isValid,
  placeholder,
  name,
}) => {
  const handleChange = debounce((e) => {
    const value = getValueFromEvent(e);

    onChange(name, value);
  }, 750);

  return (
    <FormInput
      type="password"
      placeholder={placeholder}
      name={name}
      icon={isValid ? 'check' : 'key'}
      className="password"
      onChange={(e) => { e.persist(); handleChange(e); }}
    />
  );
};

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

export default PasswordInput;
