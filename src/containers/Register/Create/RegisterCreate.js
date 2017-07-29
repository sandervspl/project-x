// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { createUserProcess, toRegisterPage, updateUserValues } from 'ducks/modules/user/create';
import { resetExists } from 'ducks/modules/user/exists';

// components
import FooterAuth from 'components/FooterAuth/FooterAuth';
import PageInner from 'components/PageInner/PageInner';
import LoginForm from './Login/Login';
import PersonalForm from './Personal/Personal';

// style
import './RegisterCreate.styl';

// redux
function mapStateToProps(state) {
  return {
    create: state.app.user.userCreate,
  };
}

const mapDispatch = { createUserProcess, toRegisterPage, resetExists, updateUserValues };

class RegisterCreate extends Component {
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
        avatar: PropTypes.shape({}),
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

  handleSubmit = (e) => {
    e.preventDefault();

    const { loginFormValid, personalFormValid } = this.props.create;

    // only allow user creation if form is completely valid
    if (!loginFormValid || !personalFormValid) {
      return;
    }

    // take all data from store
    const { firstName, lastName, username, email, password, avatar } = this.props.create.user;

    // create new user object
    const newUser = {
      user: {
        firstName,
        lastName,
        username,
        email,
        password,
      },
      avatar,
    };

    // send user object to create user action
    this.props.createUserProcess(newUser);
  };

  render() {
    return (
      <PageInner noNav>
        <div className="register-forms-container">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <LoginForm onChange={this.props.updateUserValues} />
            <PersonalForm onChange={this.props.updateUserValues} />
          </form>
          <FooterAuth type="signin" />
        </div>
      </PageInner>
    );
  }
}

export default connect(mapStateToProps, mapDispatch)(RegisterCreate);
