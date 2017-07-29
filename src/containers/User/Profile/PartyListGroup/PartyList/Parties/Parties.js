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

    let listSize = 0;
    return parties.reverse().map((party) => {
      if (party.active && listSize < 3) {
        listSize += 1;
        return <PartyListItem key={`party-${party.id}`} party={party} />;
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
