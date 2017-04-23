// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { isEmail, isEmpty } from 'validator';

// components
import InputError from 'components/InputError/InputError';

const EmailInput = ({ mailValid, validateEmail }) => {
  function onChange(e) {
    const el = e.target;

    if (el) {
      const val = el.value;

      if (!isEmpty(val)) {
        validateEmail(isEmail(val));
      } else {
        validateEmail(false);
      }
    }
  }

  const showError = (mailValid !== null && !mailValid);
  const isValid = (mailValid !== null && mailValid);
  return (
    <Form.Field>
      <Form.Input
        type="email"
        placeholder="Email address"
        icon={isValid ? 'check' : 'mail'}
        className="email"
        name="email"
        onChange={onChange}
      />
      { showError && <InputError>Enter a valid e-mail address.</InputError> }
    </Form.Field>
  );
};

EmailInput.propTypes = {
  validateEmail: PropTypes.func.isRequired,
  mailValid: PropTypes.bool,
};

export default EmailInput;
