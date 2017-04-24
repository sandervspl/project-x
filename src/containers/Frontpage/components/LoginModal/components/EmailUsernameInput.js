// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { isEmpty } from 'validator';

const EmailUsernameInput = ({ setEmailUsernameValidation }) => {
  function onChange(e) {
    const valid = !isEmpty(e.target.value);
    setEmailUsernameValidation(valid);
  }

  return (
    <Form.Input
      type="text"
      placeholder="Email or username"
      id="px-username-field"
      name="emailUsername"
      onChange={onChange}
    />
  );
};

EmailUsernameInput.propTypes = {
  setEmailUsernameValidation: PropTypes.func.isRequired,
};

export default EmailUsernameInput;
