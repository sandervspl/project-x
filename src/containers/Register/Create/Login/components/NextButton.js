// dependencies
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';

// components
import Button from 'components/Button/Button';
import PageSection from 'components/PageSection/PageSection';

// actions
import { toRegisterPage } from 'ducks/modules/user/create';

class NextButton extends Component {
  static propTypes = {
    toRegisterPage: PropTypes.func,
    create: PropTypes.shape({
      loginFormValid: PropTypes.bool,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      enabled: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loginFormValid } = nextProps.create;
    const { enabled } = this.state;

    if (loginFormValid !== enabled) {
      this.setState({ enabled: loginFormValid });
    }
  }

  onClick = (e) => {
    e.preventDefault();

    const { loginFormValid } = this.props.create;

    if (loginFormValid) {
      this.props.toRegisterPage(2);
    }
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

function mapStateToProps(state) {
  return {
    create: state.app.user.userCreate,
  };
}

export default connect(mapStateToProps, { toRegisterPage })(NextButton);
