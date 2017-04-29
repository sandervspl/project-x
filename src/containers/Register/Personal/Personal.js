// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import * as createActions from 'ducks/modules/user/create';

// style
import './Personal.styl';

// components
import FullNameGroup from './components/FullNameGroup';
import UsernameInput from './components/UsernameInput/UsernameInput';
import CreateButton from './components/CreateButton';
import PhotoUpload from './components/PhotoUpload/PhotoUpload';

@connect(
  state => ({ create: state.app.user.userCreate }),
  createActions,
)
class Register extends Component {
  static propTypes = {
    setPersonalFormValidation: PropTypes.func,
    create: PropTypes.shape({
      personalFormValid: PropTypes.bool,
      page: PropTypes.number,
    }),
  };

  state = {
    fullNameValid: null,
    usernameValid: null,
  };

  setFullNameValid = fullNameValid => this.setState({ fullNameValid }, this.isFormValid);

  setUsernameValid = usernameValid => this.setState({ usernameValid }, this.isFormValid);

  isFormValid = () => {
    const { fullNameValid, usernameValid } = this.state;
    const { setPersonalFormValidation } = this.props;
    const { personalFormValid } = this.props.create;
    const isValid = fullNameValid && usernameValid;

    if (personalFormValid !== isValid) {
      setPersonalFormValidation(isValid);
    }
  };

  render() {
    const { page } = this.props.create;

    return (
      <section className={`register-form login ${page === 2 && 'show-personal'}`}>
        <h1>You</h1>
        <p className="register-about">
          Tell us a bit about yourself!
        </p>
        <PhotoUpload />
        <FullNameGroup setValid={this.setFullNameValid} />
        <UsernameInput
          validateUsername={this.setUsernameValid}
          usernameValid={this.state.usernameValid}
        />
        <CreateButton />
      </section>
    );
  }
}

export default Register;
