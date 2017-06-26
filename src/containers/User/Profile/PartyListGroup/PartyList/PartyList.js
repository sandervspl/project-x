// dependencies
import React, { PropTypes } from 'react';

// components
import Header from 'components/Header/Header';
import Parties from './Parties/Parties';

// style
import './PartyList.styl';

const PartyList = ({ type }) => {
  const icon = type === 'hosted' ? 'home' : 'ticket';

  return (
    <div className="party-list-block">
      <Header icon={icon} iconColor="purple-medium" href="#" hrefText="Show all">{ type }</Header>
      <Parties amount={3} type={type} />
    </div>
  );
};

PartyList.propTypes = {
  type: PropTypes.oneOf(['hosted', 'attended']).isRequired,
};

export default PartyList;
