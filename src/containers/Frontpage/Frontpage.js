// dependencies
import React, { Component, PropTypes } from 'react';

// components
import FullscreenLoader from 'components/FullscreenLoader/FullscreenLoader';
import Background from './Background/Background';
import Title from './Title/Title';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import RegisterModal from './RegisterModal/RegisterModal';

class Frontpage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({}),
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      registerModalOpen: false,
    };
  }

  componentWillMount() {
    const { query } = this.props.location;

    // open login modal
    if (query.login && query.login === '1') {
      this.setState({
        registerModalOpen: false,
      });
    }

    // open register modal
    if (query.register && query.register === '1') {
      this.setState({
        registerModalOpen: true,
      });
    }
  }

  toggleModal = (modal, state) => {
    let key = '';

    switch (modal) {
      case 'signup':
        key = 'registerModalOpen';
        break;

      default:
        throw Error('invalid modal. Available modals: "signin" and "signup"');
    }

    this.setState({ [key]: state });
  };

  hasLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { registerModalOpen, loaded } = this.state;

    return (
      <main className="page-fill">
        <FullscreenLoader loaded={loaded} />
        <Background hasLoaded={this.hasLoaded} />
        <Title />
        <ButtonGroup toggleModal={this.toggleModal} />
        <RegisterModal
          isOpen={registerModalOpen}
          toggleModal={this.toggleModal}
        />
      </main>
    );
  }
}

export default Frontpage;
