// dependencies
import React, { Component, PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// components
import InputError from '../../../../components/InputError/InputError';
import NameInput from './NameInput/NameInput';

class FullNameGroup extends Component {
  static propTypes = {
    setValid: PropTypes.func.isRequired,
  };

  state = {
    firstNameValid: null,
    lastNameValid: null,
  };

  setFirstNameValid = (isValid) => {
    this.setState({ firstNameValid: isValid }, this.setValid);
  };

  setLastNameValid = (isValid) => {
    this.setState({ lastNameValid: isValid }, this.setValid);
  };

  setValid = () => {
    const { setValid } = this.props;
    const { firstNameValid, lastNameValid } = this.state;
    setValid(firstNameValid && lastNameValid);
  }

  render() {
    const { firstNameValid, lastNameValid } = this.state;
    const showErrorFirstname = firstNameValid !== null && !firstNameValid;
    const showErrorlastname = lastNameValid !== null && !lastNameValid;

    return (
      <Form.Group widths="equal" id="fullname-group">
        <NameInput
          key="0"
          setValid={this.setFirstNameValid}
          isValid={firstNameValid}
          placeholder="First name"
        />
        <NameInput
          key="1"
          setValid={this.setLastNameValid}
          isValid={lastNameValid}
          placeholder="Last name"
        />
        { showErrorFirstname && <InputError>Please fill in a first name.</InputError> }
        { showErrorlastname && <InputError>Please fill in a last name.</InputError> }
      </Form.Group>
    );
  }
}

export default FullNameGroup;
