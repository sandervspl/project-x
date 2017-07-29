// dependencies
import React, { PropTypes } from 'react';

// components
import PartyName from './PartyName/PartyName';
import PartyDate from './PartyDate/PartyDate';

// style
import './PartyInfo.styl';

const PartyInfo = ({ title, date }) => (
  <div className="party-info-container">
    <PartyName title={title} />
    <PartyDate date={date} />
  </div>
);

PartyInfo.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

PartyInfo.defaultProps = {
  title: '',
};

export default PartyInfo;
