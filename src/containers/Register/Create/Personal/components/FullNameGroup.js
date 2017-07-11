// dependencies
import React, { Component, PropTypes } from 'react';

// components
import InputError from 'components/InputError/InputError';
import FormInput from 'components/FormInput/FormInput';

// utils
import { getNameFromEvent, getValueFromEvent, validateInputMinChars } from 'utils/form';

// style
import './FullNameGroup.styl';

class FullNameGroup extends Component {
  static propTypes = {
    setValid: PropTypes.func,
    onChange: PropTypes.func,
    fullNameValid: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      firstNameValid: null,
      lastNameValid: null,
    };
  }

  componentDidUpdate() {
    const { setValid, fullNameValid } = this.props;
    const { firstNameValid, lastNameValid } = this.state;
    const valid = firstNameValid && lastNameValid;

    if (!fullNameValid && valid) {
      setValid(true);
    } else if (fullNameValid && !valid) {
      setValid(false);
    }
  }

  setName = (e) => {
    const { onChange } = this.props;
    const name = getNameFromEvent(e);
    const value = getValueFromEvent(e, true);
    const valid = validateInputMinChars(value, 1);

    // update Personal state
    onChange(name, value);

    // update validity check
    this.setState({
      [`${name}Valid`]: valid,
    });
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
