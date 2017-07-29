// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './PartyCodeDisplay.styl';

function mapStateToProps(state) {
  return {
    partyCode: state.app.party.createParty.party.code,
  };
}

const PartyCodeDisplay = ({ partyCode }) => (
  <div className="party-code-display">
    <span>Party code</span>

    <TextWithIcon
      textClassName="party-code-text"
      icon="ticket"
      iconColor="purple-medium"
      iconSize="small"
      containerClassName="party-code"
    >
      { partyCode }
    </TextWithIcon>
  </div>
);

PartyCodeDisplay.propTypes = {
  partyCode: PropTypes.string,
};

export default connect(mapStateToProps)(PartyCodeDisplay);
