// dependencies
import React, { Component } from 'react';
import qs from 'query-string';

// components
import FullscreenLoader from 'components/FullscreenLoader/FullscreenLoader';
import Background from './components/Background/Background';
import Title from './components/Title/Title';
import ButtonGroup from './components/ButtonGroup/ButtonGroup';
import LoginModal from './components/LoginModal/LoginModal';
import RegisterModal from './components/RegisterModal/RegisterModal';

class Frontpage extends Component {
  state = {
    loaded: false,
    loginModalOpen: false,
    registerModalOpen: false,
  };

  componentWillMount() {
    const queries = qs.parse(window.location.search);

    if (queries.login && queries.login === '1') {
      this.setState({
        loginModalOpen: true,
        registerModalOpen: false,
      });
    }

    if (queries.register && queries.register === '1') {
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
