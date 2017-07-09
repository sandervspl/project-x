// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// hoc
import withInput from 'hoc/withInput';

const PasswordInput = ({ onChange, getValueFromEvent, validateInputMinChar }) => {
  function handleChange(e) {
    const value = getValueFromEvent(e, true);
    const valid = validateInputMinChar(value, 1);

    onChange(value, valid);
  }

  return (
    <Form.Field>
      <Form.Input
        type="password"
        placeholder="Password"
        id="px-password-field"
        name="password"
        onChange={handleChange}
      />
    </Form.Field>
  );
};

PasswordInput.propTypes = {
  userLogin: PropTypes.shape({}),
  getUser: PropTypes.shape({}),
  onChange: PropTypes.func,
  validateInputMinChar: PropTypes.func,
  getValueFromEvent: PropTypes.func,
};

export default withInput(PasswordInput);
