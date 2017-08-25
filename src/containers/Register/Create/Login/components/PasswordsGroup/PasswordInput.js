// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { updateUserValues } from 'ducks/modules/user/create';

// components
import FormInput from 'components/FormInput/FormInput';

// helpers
import { getValueFromEvent } from 'utils/form';

const PasswordInput = (props) => {
  const onChange = (e) => {
    const value = getValueFromEvent(e);
    props.updateUserValues({ [name]: value });
  };

  return (
    <FormInput
      type="password"
      placeholder={props.placeholder}
      name={props.name}
      icon={props.isValid ? 'check' : 'key'}
      className="password"
      onChange={onChange}
    />
  );
};

PasswordInput.propTypes = {
  isValid: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  updateUserValues: PropTypes.func,
};

export default connect(null, { updateUserValues })(PasswordInput);
