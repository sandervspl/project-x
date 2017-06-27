// dependencies
import React, { PropTypes } from 'react';

// components
import Header from 'components/Header/Header';
import Parties from './Parties/Parties';

// style
import './PartyList.styl';

const PartyList = ({ type, parties, loading }) => {
  const icon = type === 'hosted' ? 'home' : 'ticket';

  return (
    <div className="party-list-block">
      <Header icon={icon} iconColor="purple-medium" href="#" hrefText="Show all">{ type }</Header>
      <Parties parties={parties} type={type} loading={loading} />
    </div>
  );
};

PartyList.propTypes = {
  type: PropTypes.oneOf(['hosted', 'attended']).isRequired,
  parties: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

PartyList.defaultProps = {
  parties: [],
};

export default PartyList;
