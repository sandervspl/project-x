// dependencies
import React, { PropTypes } from 'react';
import { Button, Icon } from 'semantic-ui-react';

// style
import './PartyButton.styl';

const PartyButton = ({ type }) => (
  type === 'create'
    ? <Button className="btn purple party-button create"><Icon name="plus" />Party</Button>
    : <Button className="btn purple party-button join" basic><Icon name="chevron circle right" />Join</Button>
);

PartyButton.propTypes = {
  type: PropTypes.oneOf(['create', 'join']).isRequired,
};

export default PartyButton;
