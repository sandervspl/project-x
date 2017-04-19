// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

// actions
import * as RegisterActions from '../../../../ducks/modules/Register';

@connect(
  state => ({ register: state.allReducers.register }),
  RegisterActions,
)
class CreateButton extends Component {
  static propTypes = {
    fullNameValid: PropTypes.bool,
    usernameValid: PropTypes.bool,
    createUser: PropTypes.func,
  };

  state = {
    enabled: false,
    loading: false,
  };

  // Check if we are creating a new account.
  // This implies the user has pressed the create button.
  // Set loading state of button according to the state.
  componentWillReceiveProps(nextProps) {
    const { fullNameValid, usernameValid } = nextProps;
    const { isCreatingNewAccount } = nextProps.register;

    // Set loading state
    if (isCreatingNewAccount) {
      this.setState({
        enabled: false,
        loading: true,
      });
    } else if (fullNameValid && usernameValid) {
      // set enabled state
      this.setState({
        enabled: true,
        loading: false,
      });
    } else {
      this.setState({
        enabled: false,
        loading: false,
      });
    }
  }

  // Handles user click on create button.
  // Disables the button and starts the async account creation process.
  // Any result will re-enable the button.
  // Because redux handles the fetching request status, loading state of button
  // is handled on componentWillReceiveProps.
  onClick = (e) => {
    const { createUser } = this.props;

    e.preventDefault();
    this.setState({ disabled: true });

    createUser()
      .then(() => {
        this.setState({ disabled: false });
      })
      .catch(() => {
        this.setState({ disabled: false });
      });
  };

  render() {
    const { enabled, loading } = this.state;

    return (
      <Button
        className="big-btn"
        id="create-btn"
        onClick={this.onClick}
        fluid
        color="purple"
        disabled={!enabled}
        loading={loading}
      >
        Create
      </Button>
    );
  }
}

export default CreateButton;
