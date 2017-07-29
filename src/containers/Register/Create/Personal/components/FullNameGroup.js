// dependencies
import React, { Component, PropTypes } from 'react';

// components
import InputError from 'components/InputError/InputError';
import FormInput from 'components/FormInput/FormInput';

// utils
import { validateInputMinChars } from 'utils/form';

// style
import './FullNameGroup.styl';

class FullNameGroup extends Component {
  static propTypes = {
    setValid: PropTypes.func,
    onChange: PropTypes.func,
  };

  state = {
    firstNameValid: null,
    lastNameValid: null,
  };

  setName = (name, value) => {
    const { firstNameValid, lastNameValid } = this.state;
    const { onChange, setValid } = this.props;
    const valid = validateInputMinChars(value, 1);

    // update store
    onChange(name, value);

    // update validity check
    this.setState(() => ({
      [`${name}Valid`]: valid,
    }));

    // validate full name
    setValid(firstNameValid, lastNameValid);
  };

  render() {
    const { firstNameValid, lastNameValid } = this.state;
    const showErrorFirstname = firstNameValid !== null && !firstNameValid;
    const showErrorlastname = lastNameValid !== null && !lastNameValid;

    return (
      <div className="full-name__container">
        <div className="full-name__inner">
          <FormInput
            type="text"
            placeholder="First name"
            name="firstName"
            className="full-name__name-input"
            onChange={this.setName}
            icon={firstNameValid ? 'check' : 'user'}
          />

          <FormInput
            type="text"
            placeholder="Last name"
            name="lastName"
            className="full-name__name-input"
            onChange={this.setName}
            icon={lastNameValid ? 'check' : 'user'}
          />
        </div>

        { showErrorFirstname && <InputError block> Please fill in a first name. </InputError> }
        { showErrorlastname && <InputError block> Please fill in a last name. </InputError> }
      </div>
    );
  }
}

export default FullNameGroup;
