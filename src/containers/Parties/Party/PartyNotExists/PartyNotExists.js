// dependencies
import React, {} from 'react';

// components
import Header from 'components/Header/Header';
import Icon from 'components/Icon/Icon';

// style
// import './PartyNotExists.styl';

const PartyNotExists = () => (
  <div className="party-not-invited-exists__overlay">
    <Icon name="question-circle-o" className="party-not-invited-exists__icon" />
    <Header size="big">This party does not exist yet.</Header>
    <p>Make your own party right now!</p>
  </div>
);

PartyNotExists.propTypes = {};

export default PartyNotExists;
