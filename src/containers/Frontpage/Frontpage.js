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

  setModalOpen = (modal, state) => {
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
    return (
      <main className="page-fill">
        <FullscreenLoader loaded={this.state.loaded} />
        <Background hasLoaded={this.hasLoaded} />
        <Title />
        <ButtonGroup setModalOpen={this.setModalOpen} />
        <LoginModal
          isOpen={this.state.loginModalOpen}
          setModalOpen={this.setModalOpen}
        />
        <RegisterModal
          isOpen={this.state.registerModalOpen}
          setModalOpen={this.setModalOpen}
        />
      </main>
    );
  }
}

export default Frontpage;
