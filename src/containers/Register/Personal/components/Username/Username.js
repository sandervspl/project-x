// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// components
import InputError from '../../../../../components/InputError/InputError';

const Username = ({ setValid, isValid }) => {
  // minimum amount of characters needed for valid username
  const usernameMinLength = 3;

  function onChange(e) {
    const el = e.target;

    if (el) {
      const val = el.value;
      setValid(val.length >= usernameMinLength);
    }
  }

  const showErrorEmpty = (isValid !== null && !isValid);
  return (
    <Form.Field>
      <Form.Input
        placeholder="Username"
        icon={isValid ? 'check' : 'user circle'}
        onChange={onChange}
      />
      {
        showErrorEmpty &&
        <InputError>Username is too short.</InputError>
      }
    </Form.Field>
  );
};

Username.propTypes = {
  setValid: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
};

export default Username;
