// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { noop } from 'lodash';
import cx from 'classnames';

// style
import './FormInput.styl';
import FormEditWrapper from '../FormEditWrapper/FormEditWrapper';

const FormInput = ({
  onChange,
  onBlur,
  className,
  type,
  name,
  placeholder,
  icon,
  disabled,
  value,
  fluid,
}) => {
  const clsName = cx(
    'px-form-input',
    {
      'px-textarea': type === 'textarea',
      'px-form-input--fluid': fluid,
    },
    className,
  );

  const ElementType = type === 'textarea' ? Form.TextArea : Form.Input;

  let props = {
    placeholder,
    name,
    onBlur,
    className: clsName,
    disabled,
    value,
  };

  if (type !== 'textarea') {
    props = { ...props, type, icon };
  }

  return (
    <FormEditWrapper onChange={onChange}>
      <ElementType {...props} />
    </FormEditWrapper>
  );
};

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  fluid: PropTypes.bool,
};

FormInput.defaultProps = {
  onChange: noop,
  onBlur: noop,
  disabled: false,
  value: '',
  className: '',
  type: null,
  icon: null,
  fluid: false,
};

export default FormInput;
