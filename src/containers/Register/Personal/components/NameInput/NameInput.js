// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// style
import './NameInput.styl';

const FirstName = ({ setValid, isValid, placeholder }) => {
  function onChange(e) {
    const el = e.target;

    if (el) {
      const val = el.value;
      setValid(val.length > 0);
    }
  }

  return (
    <Form.Input
      placeholder={placeholder || ''}
      icon={isValid ? 'check' : 'user'}
      className="fullname"
      onChange={onChange}
    />
  );
};

FirstName.propTypes = {
  setValid: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default FirstName;
