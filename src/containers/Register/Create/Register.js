// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { createUserProcess, toRegisterPage } from 'ducks/modules/user/create';
import { resetExists } from 'ducks/modules/user/exists';

// components
import FooterAuth from 'components/FooterAuth/FooterAuth';
import LoginForm from './Login/Login';
import PersonalForm from './Personal/Personal';

// style
import './Register.styl';

class Register extends Component {
  static propTypes = {
    create: PropTypes.shape({
      loginFormValid: PropTypes.bool,
      personalFormValid: PropTypes.bool,
      page: PropTypes.number,
    }),
    createUserProcess: PropTypes.func,
    toRegisterPage: PropTypes.func,
    resetExists: PropTypes.func,
  };

  componentWillUnmount() {
    const { page } = this.props.create;

    if (page !== 1) {
      this.props.toRegisterPage(1);
    }

    this.props.resetExists();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { loginFormValid, personalFormValid } = this.props.create;

    // only allow user creation if form is completely valid
    if (!loginFormValid || !personalFormValid) return;

    // look for all inputs in the form
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    let newUser = {};

    // put input values in an object
    inputs.forEach((input) => {
      if (input.name === 'verify-password') return;
      // FIXME: remove when it's available
      if (input.name === 'avatar') return;

      newUser = {
        ...newUser,
        [input.name]: input.value,
      };
    });

    // send data to create user action
    this.props.createUserProcess(newUser);
  };

  render() {
    return (
      <main id="register-page" className="page-fill">
        <section className="inner register-forms-container">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <LoginForm />
            <PersonalForm />
          </form>
          <FooterAuth type="signin" redirectURL="/?login=1" />
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    create: state.app.user.userCreate,
  };
}

export default connect(
  mapStateToProps,
  {
    createUserProcess,
    toRegisterPage,
    resetExists,
  },
)(Register);
