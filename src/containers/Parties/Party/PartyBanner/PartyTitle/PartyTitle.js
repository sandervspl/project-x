// dependencies
import React, { PropTypes } from 'react';

// style
import './PartyTitle.styl';

const PartyTitle = ({ title }) => (
  <h1 className="party-title">{ title }</h1>
);

PartyTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

PartyTitle.defaultProps = {
  title: '',
};

export default PartyTitle;
