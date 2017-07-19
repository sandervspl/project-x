// dependencies
import React, { Component, PropTypes } from 'react';

// components
import FullscreenLoader from 'components/FullscreenLoader/FullscreenLoader';
import PageFill from 'components/PageFill/PageFill';
import Background from './Background/Background';
import Title from './Title/Title';
import ButtonGroup from './ButtonGroup/ButtonGroup';

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

  hasLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { loaded } = this.state;

    return (
      <PageFill inner={false}>
        <FullscreenLoader loaded={loaded} />
        <Background hasLoaded={this.hasLoaded} />
        <Title />
        <ButtonGroup />
      </PageFill>
    );
  }
}

export default Frontpage;
