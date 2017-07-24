// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { noop } from 'lodash';

// style
import './FormInput.styl';

const FormInput = ({ onChange, onBlur, className, type, name, placeholder, icon, disabled }) => {
  const classlist = ['px-form-input'];

  if (type === 'textarea') {
    classlist.push('px-textarea');
  }
  classlist.push(className);

  const clsName = classlist.join(' ');

  if (type === 'textarea') {
    return (
      <Form.TextArea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={clsName}
        disabled={disabled}
      />
    );
  }

  return (
    <Form.Input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      className={clsName}
      icon={icon}
      disabled={disabled}
    />
  );
};

FormInput.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
};

FormInput.defaultProps = {
  onChange: noop,
  onBlur: noop,
  disabled: false,
};

export default FormInput;
