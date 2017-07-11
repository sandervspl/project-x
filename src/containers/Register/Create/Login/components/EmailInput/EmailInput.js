// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { isEmail } from 'validator';
import { debounce } from 'lodash';

// utils
import { getNameFromEvent, getValueFromEvent, validateInputMinChars } from 'utils/form';

// components
import InputError from 'components/InputError/InputError';
import FormInput from 'components/FormInput/FormInput';

// actions
import { checkExists, invalidId } from 'ducks/modules/user/exists';

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
    onChange: PropTypes.func,
  };

  validateEmail = debounce((e) => {
    const { validateEmail } = this.props;
    const { emailExists } = this.props.exists;

    // invalidate if email exists in database
    if (emailExists) {
      validateEmail(false);
    } else {
      const value = getValueFromEvent(e, true);
      const isValidEmail = isEmail(value);

      validateEmail(isValidEmail);
    }
  }, 750);

  handleChange = (e) => {
    const { onChange } = this.props;
    const name = getNameFromEvent(e);
    const value = getValueFromEvent(e, true);

    // update store
    onChange(name, value);

    // validate username
    this.validateEmail(e);
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
          onChange={(e) => { e.persist(); this.handleChange(e); }}
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

export default connect(mapStateToProps, { checkExists, invalidId })(EmailInput);
