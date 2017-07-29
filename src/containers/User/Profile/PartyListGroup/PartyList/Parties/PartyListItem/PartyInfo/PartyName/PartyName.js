// dependencies
import React, { PropTypes } from 'react';

// style
import './PartyName.styl';

const PartyName = ({ title }) => (
  <h3 className="party-name">{ title }</h3>
);

PartyName.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PartyName;
