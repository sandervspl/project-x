// dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// components
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// routes
import routes from 'routes/routes';

// style
import './PartyButton.styl';

const PartyButton = ({ type }) => (
  type === 'create'
    ? (
      <Link to={routes.party.create} className="party-button-link create-btn">
        <Button className="party-button" fontSize="big" color="purple">
          <TextWithIcon icon="plus" iconColor="white">PARTY</TextWithIcon>
        </Button>
      </Link>
    )
    : (
      <Link to={routes.party.join} className="party-button-link join-btn">
        <Button className="party-button" fontSize="big" color="purple" inverted>
          <TextWithIcon icon="chevron-circle-right" iconColor="purple">JOIN</TextWithIcon>
        </Button>
      </Link>
    )
);

PartyButton.propTypes = {
  type: PropTypes.oneOf(['create', 'join']).isRequired,
};

export default PartyButton;
