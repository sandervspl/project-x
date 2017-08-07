// dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// routes
import routes from 'routes/routes';

// components
import Icon from 'components/Icon/Icon';
import ServiceType from './ServiceType/ServiceType';
import PartyInfo from './PartyInfo/PartyInfo';

// style
import './PartyListItem.styl';

const PartyListItem = ({ party }) => {
  // create url
  const route = routes.party.party.home;
  const url = route.slice(0, route.indexOf(':')) + party.id;
  const title = party.title || '';
  const date = party.startDate || '';

  return (
    <Link to={url}>
      <div className="party-list-item-container">
        <ServiceType serviceType={party.service} />
        <PartyInfo title={title} date={date} />
        <div className="icon-container">
          <Icon name="chevron-right" color="grey-medium" />
        </div>
      </div>
    </Link>
  );
};

PartyListItem.propTypes = {
  party: PropTypes.shape({}),
};

export default PartyListItem;
