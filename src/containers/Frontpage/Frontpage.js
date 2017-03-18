// dependencies
import React, { Component } from 'react';

// components
import Background from './components/Background/Background';
import Title from './components/Title/Title';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import LoginModal from './components/LoginModal/LoginModal';

// style
import './Frontpage.styl';

class Frontpage extends Component {
  state = {
    loginModalOpen: false,
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

  render() {
    return (
      <section className="page-fill">
        <Background />
        <Title />
        <ButtonGroup open={this.showLoginModal} />
        <LoginModal open={this.state.loginModalOpen} close={this.closeLoginModal} />
      </section>
    );
  }
}

export default Frontpage;
