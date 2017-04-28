// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { isEmail, isEmpty } from 'validator';
import _ from 'lodash';

// components
import InputError from 'components/InputError/InputError';

// actions
import * as existsActions from 'ducks/modules/user/exists';

@connect(
  state => ({ exists: state.app.user.userExists }),
  existsActions,
)
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
  };

  handleChange = _.debounce((e) => {
    const el = e.target;
    const { validateEmail } = this.props;
    const { emailExists } = this.props.exists;

    // invalidate if email exists in database
    if (emailExists) {
      validateEmail(false);
    } else if (el) {
      const val = el.value;

      if (!isEmpty(val)) {
        validateEmail(isEmail(val));
      } else {
        validateEmail(false);
      }
    }
  }, 750);

  handleBlur = async (e) => {
    const { checkExists, validateEmail, invalidId } = this.props;
    const value = e.target.value;

    if (isEmpty(value)) return;
    if (!isEmail(value)) {
      invalidId('email');
      validateEmail(false);
      return;
    }

    const exists = await checkExists(value);
    validateEmail(!exists);
  };

  handleIcon = () => {
    const { mailValid } = this.props;
    const { loading, emailExists } = this.props.exists;
    const isValid = (mailValid !== null && mailValid);

    if (loading) return 'spinner';
    if (isValid && !emailExists) return 'check';

    return 'mail';
  };

  render() {
    const { mailValid } = this.props;
    const { loading, emailExists, errorMessage } = this.props.exists;
    const showInvalidError = (mailValid !== null && !mailValid && !emailExists);
    const icon = this.handleIcon();

    return (
      <Form.Field>
        <Form.Input
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

export default EmailInput;
