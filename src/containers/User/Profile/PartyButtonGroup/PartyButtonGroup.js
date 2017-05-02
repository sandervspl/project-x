// dependencies
import React, {} from 'react';

import PartyButton from './PartyButton/PartyButton';

// style
import './PartyButtonGroup.styl';

const PartyButtonGroup = () => (
  <section id="party-buttons-container">
    <PartyButton type="create" />
    <PartyButton type="join" />
  </section>
);

export default PartyButtonGroup;
