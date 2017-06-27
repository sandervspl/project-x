// dependencies
import React, { PropTypes } from 'react';
import dateFormat from 'dateformat';

// style
import './PartyDate.styl';

const PartyDate = ({ date }) => (
  <p className="party-date">{ dateFormat(date, 'dddd, mmmm dS, yyyy') }</p>
);

PartyDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default PartyDate;
