// dependencies
import React, { PropTypes } from 'react';

// components
import Loader from 'components/Loader/Loader';
import PartyListItem from './PartyListItem/PartyListItem';

// style
import './Parties.styl';

const Parties = ({ type, parties, loading }) => {
  function generateList() {
    if (parties.length === 0) {
      return <p className="no-parties-text">You have not {type} any parties yet.</p>;
    }

    return parties.reverse().map((party, index) => {
      if (index < 3) {
        return <PartyListItem key={party.id} party={party} />;
      }

      return null;
    });
  }

  return (
    <div className={`party-list ${loading ? 'flex-center' : ''}`}>
      {
        loading
        ? <Loader active={loading} color="purple" inline />
        : generateList()
      }
    </div>
  );
};

Parties.propTypes = {
  type: PropTypes.oneOf(['hosted', 'attended']).isRequired,
  parties: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

export default Parties;
