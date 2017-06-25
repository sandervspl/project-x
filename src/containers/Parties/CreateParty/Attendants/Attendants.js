// dependencies
import React, { PropTypes } from 'react';

// components
import Header from 'components/Header/Header';

// style
// import './Attendants.styl';

const Attendants = () => (
  <div>
    <Header icon="group">Attendants</Header>
  </div>
);

Attendants.propTypes = {
  addAttendant: PropTypes.func.isRequired,
  removeAttendant: PropTypes.func.isRequired,
};

export default Attendants;
