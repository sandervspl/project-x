// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// style
import './FormInput.styl';

const FormInput = ({ type, name, placeholder, onChange }) => {
  let className = 'px-form-input';

  if (type === 'textarea') {
    className += ' px-textarea';

    return (
      <Form.TextArea
        placeholder={placeholder}
        name={name}
        onChange={e => onChange(e.target.value)}
        className={className}
      />
    );
  }

  return (
    <Form.Field>
      <Form.Input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={e => onChange(e.target.value)}
        className={className}
      />
    </Form.Field>
  );
};

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

FormInput.defaultProps = {};

export default FormInput;
