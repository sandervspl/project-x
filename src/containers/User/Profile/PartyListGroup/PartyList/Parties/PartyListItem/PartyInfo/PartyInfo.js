// dependencies
import React, { PropTypes } from 'react';

// components
import PartyName from './PartyName/PartyName';
import PartyDate from './PartyDate/PartyDate';

// style
import './PartyInfo.styl';

const PartyInfo = ({ name, date }) => (
  <div className="party-info-container">
    <PartyName name={name} />
    <PartyDate date={date} />
  </div>
);

PartyInfo.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default PartyInfo;
