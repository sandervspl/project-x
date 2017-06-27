// dependencies
import React, { PropTypes } from 'react';

// style
import './PartyName.styl';

const PartyName = ({ name }) => (
  <h3 className="party-name">{ name }</h3>
);

PartyName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PartyName;
