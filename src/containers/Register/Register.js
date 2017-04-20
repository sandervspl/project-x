// dependencies
import React, { Component } from 'react';

// components
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import LoginForm from './Login/Login';
import PersonalForm from './Personal/Personal';

// style
import './Register.styl';

class Register extends Component {
  state = {
    loginFormValid: null,
  };

  setLoginFormValidation = (valid) => {
    this.setState({ loginFormValid: valid });
  };

  render() {
    return (
      <main id="register-page">
        <NavigationBar />
        <section className="inner register-forms-container">
          <LoginForm setLoginFormValidation={this.setLoginFormValidation} />
          <PersonalForm loginFormValid={this.state.loginFormValid} />
        </section>
      </main>
    );
  }
}

export default Register;
