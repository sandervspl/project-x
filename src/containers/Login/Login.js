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
import TitleWithLogo from 'components/TitleWithLogo/TitleWithLogo';
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
      formValid: null,
      formValues: {
        username: '',
        password: '',
      },
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { formValues, formValid } = nextState;

    const usernameValid = validateInputMinChar(formValues.username, 1);
    const passwordValid = validateInputMinChar(formValues.password, 1);

    if (!formValid && usernameValid && passwordValid) {
      this.setState({
        formValid: true,
      });
    } else if (formValid && (!usernameValid || !passwordValid)) {
      this.setState({
        formValid: false,
      });
    }
  }

  onChange = (e) => {
    const name = getNameFromEvent(e);
    const value = getValueFromEvent(e, true);

    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      },
    });
  };

  loginWithCredentials = () => {
    const { formValues } = this.state;
    this.props.loginProcess(formValues);
  };

  render() {
    const { formValid } = this.state;

    return (
      <PageInner>
        <TitleWithLogo> Sign in to Project-x </TitleWithLogo>

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
            formValid={formValid}
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
