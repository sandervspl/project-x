/* eslint-disable */
// dependencies
import React, { Component, PropTypes } from 'react';

// style
// import './Party.styl';

class Party extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <h3>ID: { this.props.params.id }</h3>
    );
  }
}

export default Party;
