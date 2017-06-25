// dependencies
import React, { Component, PropTypes } from 'react';

// components
import FullscreenLoader from 'components/FullscreenLoader/FullscreenLoader';
import Background from './Background/Background';
import Title from './Title/Title';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import LoginModal from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';

class Frontpage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({}),
    }),
  };

  state = {
    loaded: false,
    loginModalOpen: false,
    registerModalOpen: false,
  };

  componentWillMount() {
    const { query } = this.props.location;

    // open login modal
    if (query.login && query.login === '1') {
      this.setState({
        loginModalOpen: true,
        registerModalOpen: false,
      });
    }

    // open register modal
    if (query.register && query.register === '1') {
      this.setState({
        loginModalOpen: false,
        registerModalOpen: true,
      });
    }
  }

  toggleModal = (modal, state) => {
    let key = '';

    switch (modal) {
      case 'signin':
        key = 'loginModalOpen';
        break;

      case 'signup':
        key = 'registerModalOpen';
        break;

      default:
        throw Error('invalid modal. Available modals: "signin" and "signup"');
    }

    const obj = { [key]: state };
    this.setState(obj);
  };

  hasLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loginModalOpen, registerModalOpen, loaded } = this.state;

    return (
      <main className="page-fill">
        <FullscreenLoader loaded={loaded} />
        <Background hasLoaded={this.hasLoaded} />
        <Title />
        <ButtonGroup toggleModal={this.toggleModal} />
        <LoginModal
          isOpen={loginModalOpen}
          toggleModal={this.toggleModal}
        />
        <RegisterModal
          isOpen={registerModalOpen}
          toggleModal={this.toggleModal}
        />
      </main>
    );
  }
}

export default Frontpage;
