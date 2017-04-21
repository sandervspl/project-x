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
    createUser: PropTypes.func,
  };

  state = {
    enabled: false,
    loading: false,
  };

  /*
   * Check if we are creating a new account,
   * or if the button should enable.
   */
  componentWillReceiveProps(nextProps) {
    const { loginFormValid, personalFormValid } = nextProps.register;
    const { isCreatingNewAccount } = nextProps.register;
    const isValid = loginFormValid && personalFormValid;

    // Set loading state
    if (isCreatingNewAccount) {
      this.setState({
        enabled: false,
        loading: true,
      });
    } else if (isValid) {
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

  /*
   * Handles user click on create button.
   * Disables the button and starts the async account creation process.
   * Any result will re-enable the button.
   */
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
