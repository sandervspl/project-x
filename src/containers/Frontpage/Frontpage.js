// dependencies
import React, { Component } from 'react';

// components
import Background from './components/Background/Background';
import Title from './components/Title/Title';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import LoginModal from './components/LoginModal/LoginModal';
import RegisterModal from './components/RegisterModal/RegisterModal';
import FullscreenLoader from '../../components/FullscreenLoader/FullscreenLoader';

// style
import './Frontpage.styl';

class Frontpage extends Component {
  state = {
    loaded: false,
    loginModalOpen: false,
    registerModalOpen: false,
  };

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
    this.setState(obj, () => {
      // onOpen does not work on semantic modal
      if (this.state.loginModalOpen) {
        document.querySelector('#px-username-field > input').focus();
      }
    });
  };

  hasLoaded = () => {
    this.setState({
      loaded: true,
    });
  };

  render() {
    return (
      <section className="page-fill">
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
      </section>
    );
  }
}

export default Frontpage;
