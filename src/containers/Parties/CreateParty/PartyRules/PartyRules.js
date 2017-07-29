// dependencies
import React, { PropTypes } from 'react';

// components
import Header from 'components/Header/Header';
import RulesList from './RulesList/RulesList';

// style
// import './PartyRules.styl';

const PartyRules = ({ setRuleValue }) => (
  <div className="full-width">
    <Header icon="shield" iconColor="purple-medium">Rules</Header>
    <RulesList setRuleValue={setRuleValue} />
  </div>
);

PartyRules.propTypes = {
  setRuleValue: PropTypes.func,
};

export default PartyRules;
