// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { isEmail } from 'validator';
import { debounce } from 'lodash';

// utils
import { getValueFromEvent, validateInputMinChars } from 'utils/form';

// components
import InputError from 'components/InputError/InputError';
import FormInput from 'components/FormInput/FormInput';

// actions
import { checkExists, invalidId } from 'ducks/modules/user/exists';
import { updateUserValues } from 'ducks/modules/user/create';

class EmailInput extends Component {
  static propTypes = {
    validateEmail: PropTypes.func.isRequired,
    mailValid: PropTypes.bool,
    exists: PropTypes.shape({
      loading: PropTypes.bool,
      emailExists: PropTypes.bool,
      errorMessage: PropTypes.string,
    }),
    checkExists: PropTypes.func,
    invalidId: PropTypes.func,
    updateUserValues: PropTypes.func,
  };

  validateEmail = debounce((value) => {
    const { validateEmail } = this.props;
    const { emailExists } = this.props.exists;

    // invalidate if email exists in database
    if (emailExists) {
      validateEmail(false);
    } else {
      const isValidEmail = isEmail(value);

      validateEmail(isValidEmail);
    }
  }, 750);

  handleChange = (name, value) => {
    // validate username
    this.validateEmail(value);

    // update store
    this.props.updateUserValues({ [name]: value });
  };

  handleBlur = async (e) => {
    const { validateEmail } = this.props;
    const value = getValueFromEvent(e, true);

    if (!validateInputMinChars(value, 1)) {
      return;
    }

    if (!isEmail(value)) {
      this.props.invalidId('email');
      validateEmail(false);
      return;
    }

    const exists = await this.props.checkExists(value);
    validateEmail(!exists);
  };

  handleIcon = () => {
    const { mailValid } = this.props;
    const { loading, emailExists } = this.props.exists;
    const isValid = (mailValid !== null && mailValid);

    if (loading) {
      return 'spinner';
    }

    if (isValid && !emailExists) {
      return 'check';
    }

    return 'mail';
  };

  render() {
    const { mailValid } = this.props;
    const { loading, emailExists, errorMessage } = this.props.exists;
    const showInvalidError = (mailValid !== null && !mailValid && !emailExists);
    const icon = this.handleIcon();

    return (
      <Form.Field>
        <FormInput
          type="email"
          placeholder="Email address"
          icon={icon}
          className="email"
          name="email"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          disabled={loading}
        />
        { showInvalidError && <InputError>Enter a valid e-mail address.</InputError> }
        { emailExists && <InputError>{ errorMessage }</InputError> }
      </Form.Field>
    );
  }
}

function mapStateToProps(state) {
  return {
    exists: state.app.user.userExists,
  };
}

export default connect(mapStateToProps, { checkExists, invalidId, updateUserValues })(EmailInput);
