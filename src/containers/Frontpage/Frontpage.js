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
  }

  showLoginModal = () => {
    this.setState({
      loginModalOpen: true,
    });
  }

  closeLoginModal = () => {
    this.setState({
      loginModalOpen: false,
    });
  }

  showRegisterModal = () => {
    this.setState({
      registerModalOpen: true,
    });
  }

  closeRegisterModal = () => {
    this.setState({
      registerModalOpen: false,
    });
  }

  hasLoaded = () => {
    this.setState({
      loaded: true,
    });
  }

  render() {
    return (
      <section className="page-fill">
        <FullscreenLoader loaded={this.state.loaded} />
        <Background hasLoaded={this.hasLoaded} />
        <Title />
        <ButtonGroup openLogin={this.showLoginModal} openRegister={this.showRegisterModal} />
        <LoginModal open={this.state.loginModalOpen} close={this.closeLoginModal} />
        <RegisterModal open={this.state.registerModalOpen} close={this.closeRegisterModal} />
      </section>
    );
  }
}

export default Frontpage;
