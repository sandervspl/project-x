// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// hoc
import withInput from 'hoc/withInput';

const EmailUsernameInput = ({ onChange, getValueFromEvent, validateInputMinChar }) => {
  function handleChange(e) {
    const value = getValueFromEvent(e, true);
    const valid = validateInputMinChar(value, 1);

    onChange(value, valid);
  }

  return (
    <Form.Input
      type="text"
      placeholder="Email or username"
      id="px-username-field"
      name="emailUsername"
      onChange={handleChange}
    />
  );
};

EmailUsernameInput.propTypes = {
  onChange: PropTypes.func,
  getValueFromEvent: PropTypes.func,
  validateInputMinChar: PropTypes.func,
};

export default withInput(EmailUsernameInput);
