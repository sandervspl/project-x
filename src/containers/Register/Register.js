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
    toRegisterPage: PropTypes.func,
    register: PropTypes.shape({
      loginFormValid: PropTypes.bool,
      personalFormValid: PropTypes.bool,
      page: PropTypes.number,
    }),
  };

  componentWillUnmount() {
    const { toRegisterPage } = this.props;
    const { page } = this.props.register;

    if (page !== 1) toRegisterPage(1);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { loginFormValid, personalFormValid } = this.props.register;
    const { createUser } = this.props;

    // only allow user creation if form is completely valid
    if (!loginFormValid || !personalFormValid) return;

    // look for all inputs in the form
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    const newUser = { user: {} };

    // put input values in an object
    inputs.forEach((input) => {
      if (input.name === 'verify-password') return;
      // FIXME: remove when it's available
      if (input.name === 'avatar') return;

      newUser.user = {
        ...newUser.user,
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
