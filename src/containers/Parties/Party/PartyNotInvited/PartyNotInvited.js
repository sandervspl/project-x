// dependencies
import React from 'react';

// components
import Header from 'components/Header/Header';
import Icon from 'components/Icon/Icon';

// style
// import './PartyNotInvited.styl';

const PartyNotInvited = () => (
  <div className="party-not-invited-exists__overlay">
    <Icon name="ban" className="party-not-invited-exists__icon" />
    <Header size="big">Not invited!</Header>
    <p>The host needs to invite you to this party.</p>
  </div>
);

PartyNotInvited.propTypes = {};

export default PartyNotInvited;
