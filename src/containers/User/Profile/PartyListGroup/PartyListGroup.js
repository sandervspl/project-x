// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import PartyList from './PartyList/PartyList';

// style
import './PartyListGroup.styl';

const PartyListGroup = ({ userParties }) => (
  <section id="party-list-container">
    <PartyList type="hosted" parties={userParties.parties} />
    <PartyList type="attended" />
  </section>
);

PartyListGroup.propTypes = {
  userParties: PropTypes.shape({
    // parties: PropTypes.arrayOf({}),
  }),
};

function mapStateToProps(state) {
  return {
    userParties: state.app.party.userParties,
  };
}

export default connect(mapStateToProps, null)(PartyListGroup);
