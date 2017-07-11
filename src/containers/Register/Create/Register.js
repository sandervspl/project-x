// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

// actions
import { createUserProcess, toRegisterPage, updateUserValues } from 'ducks/modules/user/create';
import { resetExists } from 'ducks/modules/user/exists';

// components
import FooterAuth from 'components/FooterAuth/FooterAuth';
import PageInner from 'components/PageInner/PageInner';
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
      user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        username: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
    createUserProcess: PropTypes.func,
    toRegisterPage: PropTypes.func,
    resetExists: PropTypes.func,
    updateUserValues: PropTypes.func,
  };

  componentWillUnmount() {
    const { page } = this.props.create;

    if (page !== 1) {
      this.props.toRegisterPage(1);
    }

    this.props.resetExists();
  }

  updateUserValuesInState = (key, value) => {
    this.updateUserValuesInStore(key, value);
  };

  updateUserValuesInStore = debounce((key, value) => {
    this.props.updateUserValues(key, value);
  }, 250);

  handleSubmit = (e) => {
    e.preventDefault();

    const { loginFormValid, personalFormValid } = this.props.create;

    // only allow user creation if form is completely valid
    if (!loginFormValid || !personalFormValid) {
      return;
    }

    // take all data from store
    const { firstName, lastName, username, email, password } = this.props.create.user;

    // create new user object
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    // send user object to create user action
    this.props.createUserProcess(newUser);
  };

  render() {
    return (
      <PageInner noNav>
        <div className="register-forms-container">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <LoginForm onChange={this.updateUserValuesInState} />
            <PersonalForm onChange={this.updateUserValuesInState} />
          </form>
          <FooterAuth type="signin" redirectURL="/?login=1" />
        </div>
      </PageInner>
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
    updateUserValues,
  },
)(Register);
