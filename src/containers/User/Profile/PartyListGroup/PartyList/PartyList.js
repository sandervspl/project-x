// dependencies
import React, { PropTypes } from 'react';

// components
import Header from './Header/Header';
import Parties from './Parties/Parties';

// style
import './PartyList.styl';

const PartyList = ({ type }) => (
  <div className="party-list-block">
    <Header type={type} />
    <Parties amount={3} type={type} />
  </div>
);

PartyList.propTypes = {
  type: PropTypes.oneOf(['hosted', 'attended']).isRequired,
};

export default PartyList;
