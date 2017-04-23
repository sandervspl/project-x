// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import * as RegisterActions from 'ducks/modules/register';

// style
import './Personal.styl';

// components
import FullNameGroup from './components/FullNameGroup';
import Username from './components/Username/Username';
import CreateButton from './components/CreateButton';
import PhotoUpload from './components/PhotoUpload/PhotoUpload';

@connect(
  state => ({ register: state.app.register }),
  RegisterActions,
)
class Register extends Component {
  static propTypes = {
    setPersonalFormValidation: PropTypes.func,
    register: PropTypes.shape({
      personalFormValid: PropTypes.bool,
      page: PropTypes.number,
    }),
  };

  state = {
    fullNameValid: null,
    usernameValid: null,
  };

  setFullNameValid = (fullNameValid) => {
    this.setState({ fullNameValid }, this.isFormValid);
  };

  setUsernameValid = (usernameValid) => {
    this.setState({ usernameValid }, this.isFormValid);
  };

  isFormValid = () => {
    const { fullNameValid, usernameValid } = this.state;
    const { setPersonalFormValidation } = this.props;
    const { personalFormValid } = this.props.register;
    const isValid = fullNameValid && usernameValid;

    if (personalFormValid !== isValid) {
      setPersonalFormValidation(isValid);
    }
  };

  render() {
    const { page } = this.props.register;

    return (
      <section className={`register-form login ${page === 2 && 'show-personal'}`}>
        <h1>You</h1>
        <p className="register-about">
          Tell us a bit about yourself!
        </p>
        <PhotoUpload />
        <FullNameGroup setValid={this.setFullNameValid} />
        <Username
          setValid={this.setUsernameValid}
          isValid={this.state.usernameValid}
        />
        <CreateButton />
      </section>
    );
  }
}

export default Register;
