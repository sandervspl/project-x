// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { debounce } from 'lodash';

// actions
import { checkExists, invalidId } from 'ducks/modules/user/exists';

// components
import InputError from 'components/InputError/InputError';
import FormInput from 'components/FormInput/FormInput';

// utils
import { getNameFromEvent, getValueFromEvent, validateInputMinChars } from 'utils/form';

const minCharacterAmount = 3;

class Username extends Component {
  static propTypes = {
    validateUsername: PropTypes.func.isRequired,
    usernameValid: PropTypes.bool,
    exists: PropTypes.shape({
      loading: PropTypes.bool,
      usernameExists: PropTypes.bool,
      errorMessage: PropTypes.string,
    }),
    checkExists: PropTypes.func,
    invalidId: PropTypes.func,
    create: PropTypes.shape({
      error: PropTypes.bool,
      errorMessage: PropTypes.string,
    }),
    onChange: PropTypes.func,
  };

  validateUsername = debounce((e) => {
    // minimum amount of characters needed for valid username
    const { validateUsername } = this.props;
    const { usernameExists } = this.props.exists;

    if (usernameExists) {
      validateUsername(false);
    } else {
      const value = getValueFromEvent(e, true);
      validateUsername(validateInputMinChars(value, minCharacterAmount));
    }
  }, 750);

  handleChange = (e) => {
    const { onChange } = this.props;
    const name = getNameFromEvent(e);
    const value = getValueFromEvent(e, true);

    // update store
    onChange(name, value);

    // validate username
    this.validateUsername(e);
  };

  handleBlur = async (e) => {
    const { validateUsername } = this.props;
    const value = getValueFromEvent(e, true);

    if (!validateInputMinChars(value, minCharacterAmount)) {
      this.props.invalidId('username');
      validateUsername(false);
      return;
    }

    const exists = await this.props.checkExists(value);
    validateUsername(!exists);
  };

  handleIcon = () => {
    const { usernameValid } = this.props;
    const { loading, usernameExists } = this.props.exists;
    const isValid = (usernameValid !== null && usernameValid);

    if (loading) return 'spinner';
    if (isValid && !usernameExists) return 'check';

    return 'user circle';
  };

  render() {
    const { usernameValid } = this.props;
    const { loading, usernameExists, errorMessage } = this.props.exists;
    const { error } = this.props.create;
    const errorMessageCreate = this.props.create.errorMessage;
    const showErrorShort = (usernameValid !== null && !usernameValid && !usernameExists);
    const icon = this.handleIcon();

    return (
      <Form.Field>
        <FormInput
          type="text"
          placeholder="Username"
          name="username"
          icon={icon}
          onChange={(e) => { e.persist(); this.handleChange(e); }} // persist is needed for debounce
          onBlur={this.handleBlur}
          disabled={loading}
        />

        {
          showErrorShort &&
            <InputError>Username is too short.</InputError>
        }

        { usernameExists && <InputError>{errorMessage}</InputError> }

        { error && <InputError>{errorMessageCreate}</InputError>}
      </Form.Field>
    );
  }
}

function mapStateToProps(state) {
  return {
    exists: state.app.user.userExists,
    create: state.app.user.userCreate,
  };
}

export default connect(mapStateToProps, { checkExists, invalidId })(Username);
