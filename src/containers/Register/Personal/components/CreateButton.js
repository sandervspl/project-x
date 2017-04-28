// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

@connect(state => ({ create: state.app.user.userCreate }))
class CreateButton extends Component {
  static propTypes = {
    create: PropTypes.shape({
      loaded: PropTypes.bool,
    }),
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
    const { loginFormValid, personalFormValid, loading } = nextProps.create;
    const isValid = loginFormValid && personalFormValid;

    // Set loading state
    if (loading) {
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

  handleClick = () => {
    this.setState({ disabled: true });
  };

  render() {
    const { enabled, loading } = this.state;
    const { loaded } = this.props.create;

    return (
      <Button
        className="big-btn"
        id="create-btn"
        onClick={this.handleClick}
        fluid
        color="purple"
        disabled={!enabled || loaded}
        loading={loading}
      >
        Create
      </Button>
    );
  }
}

export default CreateButton;
