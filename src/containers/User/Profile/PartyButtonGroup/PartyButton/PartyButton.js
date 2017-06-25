// dependencies
import React, { PropTypes } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

// routes
import routes from 'routes/routes';

// style
import './PartyButton.styl';

const PartyButton = ({ type }) => (
  type === 'create'
    ? (
      <Link to={routes.party.create} className="party-button-link">
        <Button className="btn purple party-button create">
          <Icon name="plus" />
          Party
        </Button>
      </Link>
    )
    : (
      <Link to={routes.party.join} className="party-button-link">
        <Button className="btn purple party-button join" basic>
          <Icon name="chevron circle right" />
          Join
        </Button>
      </Link>
    )
);

PartyButton.propTypes = {
  type: PropTypes.oneOf(['create', 'join']).isRequired,
};

export default PartyButton;
