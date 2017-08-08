// dependencies
import React, { PropTypes } from 'react';
import cx from 'classnames';

// components
import Loader from 'components/Loader/Loader';
import PartyListItem from './PartyListItem/PartyListItem';

// style
import './Parties.styl';

const NoPartiesLabel = ({ type }) => (
  <p className="no-parties-text">
    You have not {type} any parties yet.
  </p>
);
NoPartiesLabel.propTypes = {
  type: PropTypes.string,
};

const Parties = ({ type, parties, loading }) => {
  function generateList() {
    let listSize = 0;
    const partyList = parties.reverse()
      .filter((party) => {
        if (party.active && listSize < 3) {
          listSize += 1;
          return party;
        }

        return null;
      })
      .map(party => <PartyListItem key={`party-${party.id}`} party={party} />);

    return partyList.length > 0
      ? partyList
      : <NoPartiesLabel type={type} />;
  }

  const clsName = cx('party-list', { 'flex-center': loading });

  return (
    <div className={clsName}>
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
