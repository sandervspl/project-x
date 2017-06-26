// dependencies
import React, { PropTypes } from 'react';

// components
import Header from 'components/Header/Header';
import RulesList from './RulesList/RulesList';

// style
// import './PartyRules.styl';

const PartyRules = ({ defaultRuleValues, setRuleValue }) => (
  <div id="party-rules-container">
    <Header icon="shield" iconColor="purple-medium">Rules</Header>
    <RulesList defaultRuleValues={defaultRuleValues} setRuleValue={setRuleValue} />
  </div>
);

PartyRules.propTypes = {
  defaultRuleValues: PropTypes.shape({}),
  setRuleValue: PropTypes.func,
};

export default PartyRules;
