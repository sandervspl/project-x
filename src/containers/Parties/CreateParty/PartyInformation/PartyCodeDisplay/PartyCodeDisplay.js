// dependencies
import React, { PropTypes } from 'react';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';

// style
import './PartyCodeDisplay.styl';

const PartyCodeDisplay = ({ code }) => (
  <div className="party-code-display">
    <span>Party code</span>

    <TextWithIcon
      textClassName="party-code-text"
      icon="ticket"
      iconColor="purple-medium"
      iconSize="small"
      containerClassName="party-code"
    >
      { code }
    </TextWithIcon>
  </div>
);

PartyCodeDisplay.propTypes = {
  code: PropTypes.string,
};

export default PartyCodeDisplay;
