// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import * as registerActions from 'ducks/modules/register';

// components
import NavigationBar from 'components/NavigationBar/NavigationBar';
import LoginForm from './Login/Login';
import PersonalForm from './Personal/Personal';

// style
import './Register.styl';


@connect(
  state => ({ register: state.app.register }),
  registerActions,
)
class Register extends Component {
  static propTypes = {
    createUser: PropTypes.func,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { createUser } = this.props;

    // look for all inputs in the form
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    let newUser = {};

    // put input values in an object
    inputs.forEach((input) => {
      if (input.name === 'verify-password') return;

      newUser = {
        ...newUser,
        [input.name]: input.value,
      };
    });

    // send data to create user action
    createUser(newUser);
  }

  render() {
    return (
      <main id="register-page">
        <NavigationBar />
        <section className="inner register-forms-container">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <LoginForm />
            <PersonalForm />
          </form>
        </section>
      </main>
    );
  }
}

export default Register;
