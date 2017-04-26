// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

// components
import InputError from 'components/InputError/InputError';

// actions
import * as RegisterActions from 'ducks/modules/register';

@connect(
  state => ({ register: state.app.register }),
  RegisterActions,
)
class Username extends Component {
  static propTypes = {
    validateUsername: PropTypes.func.isRequired,
    usernameValid: PropTypes.bool,
    register: PropTypes.shape({
      fetching: PropTypes.bool,
      usernameExists: PropTypes.bool,
      fetchMessage: PropTypes.string,
    }),
    checkExists: PropTypes.func,
  };
  static usernameMinLength = 3;

  handleChange = (e) => {
    const el = e.target;
    // minimum amount of characters needed for valid username
    const { validateUsername } = this.props;

    if (el) {
      const val = el.value;
      validateUsername(val.length >= Username.usernameMinLength);
    }
  }

  handleBlur = async (e) => {
    const { checkExists, validateUsername } = this.props;
    const value = e.target.value;

    if (value.length < Username.usernameMinLength) return;

    const exists = await checkExists(value);
    validateUsername(!exists);
  }

  handleIcon = () => {
    const { usernameValid } = this.props;
    const { fetching, usernameExists } = this.props.register;
    const isValid = (usernameValid !== null && usernameValid);

    if (fetching) return 'spinner';
    if (isValid && !usernameExists) return 'check';

    return 'user circle';
  }

  render() {
    const { usernameValid } = this.props;
    const { fetching, usernameExists, fetchMessage } = this.props.register;
    const showErrorShort = (usernameValid !== null && !usernameValid && !usernameExists);
    const icon = this.handleIcon();

    return (
      <Form.Field>
        <Form.Input
          placeholder="Username"
          name="username"
          icon={icon}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          disabled={fetching}
        />
        {
          showErrorShort &&
          <InputError>Username is too short.</InputError>
        }
        { usernameExists && <InputError>{ fetchMessage }</InputError> }
      </Form.Field>
    );
  }
}

export default Username;
