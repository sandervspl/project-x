// dependencies
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

// actions
import { loginProcess } from 'ducks/modules/user/login';

// utils
import { getValueFromEvent, getNameFromEvent, validateInputMinChar } from 'utils/form';

// components
import PageInner from 'components/PageInner/PageInner';
import Header from 'components/Header/Header';
import FooterAuth from 'components/FooterAuth/FooterAuth';
import FormInput from 'components/FormInput/FormInput';
import LoginFormError from './LoginFormError/LoginFormError';
import LoginButton from './LoginButton/LoginButton';
import HelpLogin from './HelpLogin/HelpLogin';
import ServiceLoginButtons from './ServiceLoginButtons/ServiceLoginButtons';

// style
import './Login.styl';

class Login extends Component {
  static propTypes = {
    loginProcess: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      formValid: {
        username: null,
        password: null,
      },
      formValues: {
        username: '',
        password: '',
      },
    };
  }

  onChange = (e) => {
    const name = getNameFromEvent(e);
    const value = getValueFromEvent(e, true);
    const valid = validateInputMinChar(value, 1);

    this.setState({
      formValid: {
        ...this.state.formValid,
        [name]: valid,
      },
      formValues: {
        ...this.state.formValues,
        [name]: value,
      },
    });
  };

  isFormValid = () =>
    this.state.formValid.username && this.state.formValid.password;

  loginWithCredentials = () => {
    const { formValues } = this.state;
    this.props.loginProcess(formValues);
  };

  render() {
    return (
      <PageInner>
        <Header textAlign="center" size="small">(logo)</Header>
        <Header textAlign="center" size="big">Sign in to Project-x</Header>

        <Form className="login-form__container">
          <FormInput
            type="text"
            placeholder="Email or username"
            id="px-username-field"
            name="username"
            onChange={this.onChange}
          />
          <FormInput
            type="password"
            placeholder="Password"
            id="px-password-field"
            name="password"
            onChange={this.onChange}
          />

          <LoginFormError />

          <LoginButton
            formValid={this.isFormValid()}
            onClick={this.loginWithCredentials}
          />
        </Form>

        <HelpLogin />

        <ServiceLoginButtons />

        <FooterAuth type="signup" />
      </PageInner>
    );
  }
}

export default connect(null, { loginProcess })(Login);
