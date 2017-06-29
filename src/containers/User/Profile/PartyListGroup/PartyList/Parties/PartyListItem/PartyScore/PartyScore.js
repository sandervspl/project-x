// dependencies
import React, { PropTypes } from 'react';

// style
import './PartyScore.styl';

const PartyScore = ({ score }) => (
  <div className="party-score-container">
    <span className="party-score">+{ score }</span>
  </div>
);

PartyScore.propTypes = {
  score: PropTypes.string,
};

PartyScore.defaultProps = {
  score: '1337',
};

export default PartyScore;
