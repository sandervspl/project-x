// dependencies
import React, { Component, PropTypes } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { isNull, isEmpty } from 'lodash';

// utils
import { validateInputMinChars } from 'utils/form';

// components
import InputError from 'components/InputError/InputError';
import PasswordInput from './PasswordInput';

const passwordMinLength = 8;

class PasswordsGroup extends Component {
  static propTypes = {
    validatePasswords: PropTypes.func.isRequired,
    // passwordsValid: PropTypes.bool,
    onChange: PropTypes.func,
    create: PropTypes.shape({
      user: PropTypes.shape({
        password: PropTypes.string,
        passwordRepeat: PropTypes.string,
      }),
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      passwordValid: null,
      passwordRepeatValid: null,
    };
  }

  componentWillUpdate(nextProps) {
    const { validatePasswords } = this.props;
    const { password, passwordRepeat } = nextProps.create.user;
    const { password: curPassword, passwordRepeat: curPasswordRepeat } = this.props.create.user;

    let valid = null;
    if (!isEmpty(passwordRepeat)) {
      valid = curPassword === passwordRepeat || curPasswordRepeat === password;
    }

    if (password !== curPassword || passwordRepeat !== curPasswordRepeat) {
      this.setState({
        passwordValid: validateInputMinChars(password, passwordMinLength),
        passwordRepeatValid: password === passwordRepeat,
      });
    }

    validatePasswords(valid);
  }

  passwordsAreNotEqual = () => {
    const { password, passwordRepeat } = this.props.create.user;
    return isEmpty(passwordRepeat) ? null : password !== passwordRepeat;
  };

  render() {
    const { passwordValid, passwordRepeatValid } = this.state;
    const { onChange } = this.props;

    // errors
    const pwShort = !isNull(passwordValid) && !passwordValid;
    const pwNotEqual = this.passwordsAreNotEqual();

    return (
      <div>
        <Form.Field>
          <PasswordInput
            onChange={onChange}
            isValid={passwordValid}
            placeholder="Password"
            name="password"
          />
          { pwShort && <InputError>Should be at least 8 characters long.</InputError> }
        </Form.Field>

        <Form.Field>
          <PasswordInput
            onChange={onChange}
            isValid={passwordRepeatValid}
            placeholder="repeat password"
            name="passwordRepeat"
          />
          { pwNotEqual && <InputError>Passwords do not match.</InputError> }
        </Form.Field>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    create: state.app.user.userCreate,
  };
}


export default connect(mapStateToProps)(PasswordsGroup);
