// dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import OptionWithSwitch from 'components/OptionWithSwitch/OptionWithSwitch';

// style
// import './RulesList.styl';

function mapStateToProps(state) {
  return {
    settings: state.app.party.createParty.party.settings,
  };
}

const RulesList = ({ settings, setRuleValue }) => (
  <div>
    <OptionWithSwitch
      tag="allowDuplicateSongs"
      onChange={setRuleValue}
      isOn={settings.allowDuplicateSongs}
    >
      Allow duplicate songs
    </OptionWithSwitch>

    <OptionWithSwitch
      tag="allowExplicitSongs"
      onChange={setRuleValue}
      isOn={settings.allowExplicitSongs}
    >
      Allow explicit songs
    </OptionWithSwitch>

    <OptionWithSwitch
      tag="approveSongs"
      onChange={setRuleValue}
      isOn={settings.approveSongs}
    >
      Approve suggested songs
    </OptionWithSwitch>
  </div>
);

RulesList.propTypes = {
  settings: PropTypes.shape({}),
  setRuleValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RulesList);
