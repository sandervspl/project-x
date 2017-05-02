// dependencies
import React, {} from 'react';

// components
import PartyList from './PartyList/PartyList';

// style
import './PartyListGroup.styl';

const PartyListGroup = () => (
  <section id="party-list-container">
    <PartyList type="hosted" />
    <PartyList type="attended" />
  </section>
);

PartyListGroup.propTypes = {};

export default PartyListGroup;
