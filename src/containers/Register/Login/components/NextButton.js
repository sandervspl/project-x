// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';

// components
import Button from 'components/Button/Button';
import PageSection from 'components/PageSection/PageSection';

// actions
import * as createActions from 'ducks/modules/user/create';

@connect(
  state => ({ create: state.app.user.userCreate }),
  createActions,
)
class NextButton extends Component {
  static propTypes = {
    toRegisterPage: PropTypes.func,
    create: PropTypes.shape({
      loginFormValid: PropTypes.bool,
    }),
  };

  state = {
    enabled: false,
  };

  componentWillReceiveProps(nextProps) {
    const { loginFormValid } = nextProps.create;
    const { enabled } = this.state;

    if (loginFormValid !== enabled) {
      this.setState({ enabled: loginFormValid });
    }
  }

  onClick = (e) => {
    e.preventDefault();

    const { toRegisterPage } = this.props;
    const { loginFormValid } = this.props.create;

    if (loginFormValid) toRegisterPage(2);
  };

  render() {
    const { enabled } = this.state;

    return (
      <PageSection>
        <Button
          color="purple"
          onClick={this.onClick}
          disabled={!enabled}
          fontSize="big"
        >
          NEXT
        </Button>
      </PageSection>
    );
  }
}

export default NextButton;
