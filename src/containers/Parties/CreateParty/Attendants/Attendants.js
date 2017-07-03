// dependencies
import React, { PropTypes } from 'react';

// components
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';

// style
// import './Attendants.styl';

const Attendants = () => (
  <div className="full-width">
    <Header icon="group" iconColor="purple-medium">Attendants</Header>

    <Button
      color="purple"
      inverted
      icon="user-plus"
      iconColor="purple-medium"
      textAlign="left"
    >
      Invite friend
    </Button>

    {/* TODO: map all attendants here from CreateParty state.attendants array */}
  </div>
);

Attendants.propTypes = {
  addAttendant: PropTypes.func.isRequired,
  removeAttendant: PropTypes.func.isRequired,
};

export default Attendants;
