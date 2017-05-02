// dependencies
import React, { PropTypes } from 'react';

// style
import './Parties.styl';

const Parties = ({ amount, type }) => {
  function generateList() {
    console.log(amount);

    return <p className="no-parties-text">You have not {type} any parties yet.</p>;
  }

  return (
    <div className="party-list">
      { generateList() }
    </div>
  );
};

Parties.propTypes = {
  amount: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['hosted', 'attended']).isRequired,
};

export default Parties;
