// dependencies
import React, { PropTypes } from 'react';

// components
import OptionWithSwitch from 'components/OptionWithSwitch/OptionWithSwitch';

// style
// import './RulesList.styl';

const RulesList = ({ defaultRuleValues, setRuleValue }) => (
  <div>
    <OptionWithSwitch
      tag="useHostDevice"
      onChange={setRuleValue}
      isOn={defaultRuleValues.useHostDevice}
    >
      {'Explicitly use host\'s device'}
    </OptionWithSwitch>

    <OptionWithSwitch
      tag="allowDuplicateSongs"
      onChange={setRuleValue}
      isOn={defaultRuleValues.allowDuplicateSongs}
    >
      Allow duplicate songs
    </OptionWithSwitch>

    <OptionWithSwitch
      tag="allowExplicitSongs"
      onChange={setRuleValue}
      isOn={defaultRuleValues.allowExplicitSongs}
    >
      Allow explicit songs
    </OptionWithSwitch>

    <OptionWithSwitch
      tag="approveSongs"
      onChange={setRuleValue}
      isOn={defaultRuleValues.approveSongs}
    >
      Approve suggested songs
    </OptionWithSwitch>
  </div>
);

RulesList.propTypes = {
  defaultRuleValues: PropTypes.shape({}),
  setRuleValue: PropTypes.func.isRequired,
};

export default RulesList;
