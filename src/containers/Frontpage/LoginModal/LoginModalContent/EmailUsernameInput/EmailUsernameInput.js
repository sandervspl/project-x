// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { isEmpty } from 'validator';

const EmailUsernameInput = (props, context) => {
  function onChange(e) {
    const value = e.target.value.trim();
    const valid = !isEmpty(value);

    context.setEmailUsernameValidation(valid, value);
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

EmailUsernameInput.contextTypes = {
  setEmailUsernameValidation: PropTypes.func,
};

export default EmailUsernameInput;
