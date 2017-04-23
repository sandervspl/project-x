// dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

@connect(
  state => ({ register: state.app.register }),
)
class CreateButton extends Component {
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

  onClick = () => {
    this.setState({ disabled: true });
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
