// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { setPersonalFormValidation } from 'ducks/modules/user/create';

// style
import './Personal.styl';

// components
import FullNameGroup from './components/FullNameGroup';
import UsernameInput from './components/UsernameInput/UsernameInput';
import CreateButton from './components/CreateButton';
import PhotoUpload from './components/PhotoUpload/PhotoUpload';

class Register extends Component {
  static propTypes = {
    setPersonalFormValidation: PropTypes.func,
    create: PropTypes.shape({
      personalFormValid: PropTypes.bool,
      page: PropTypes.number,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      fullNameValid: null,
      usernameValid: null,
    };
  }

  componentDidUpdate() {
    this.isFormValid();
  }

  setFullNameValid = (fullNameValid) => {
    this.setState({ fullNameValid });
  };

  setUsernameValid = (usernameValid) => {
    this.setState({ usernameValid });
  };

  isFormValid = () => {
    const { fullNameValid, usernameValid } = this.state;
    const { personalFormValid } = this.props.create;
    const isValid = fullNameValid && usernameValid;

    if (personalFormValid !== isValid) {
      this.props.setPersonalFormValidation(isValid);
    }
  };

  render() {
    const { page } = this.props.create;
    const isPageTwo = page === 2;

    return (
      <section className={`register-form login ${isPageTwo && 'show-personal'}`}>
        {isPageTwo &&
        <div>
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
        </div>
        }
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    create: state.app.user.userCreate,
  };
}

export default connect(mapStateToProps, { setPersonalFormValidation })(Register);
