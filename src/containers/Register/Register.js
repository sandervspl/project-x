// dependencies
import React from 'react';

// components
import NavigationBar from 'components/NavigationBar/NavigationBar';
import LoginForm from './Login/Login';
import PersonalForm from './Personal/Personal';

// style
import './Register.styl';

const Register = () => (
  <main id="register-page">
    <NavigationBar />
    <section className="inner register-forms-container">
      <LoginForm />
      <PersonalForm />
    </section>
  </main>
);

export default Register;
