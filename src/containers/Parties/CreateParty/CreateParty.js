// dependencies
import React, { Component } from 'react';

// components
import PageSection from 'components/PageSection/PageSection';
import PartyInformation from './PartyInformation/PartyInformation';
import PartyRules from './PartyRules/PartyRules';
import Attendants from './Attendants/Attendants';

// style
// import './Create.styl';

class CreateParty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partyName: '',
      partyCode: '42069',
      partyDescription: '',
      attendants: [],
      rules: {
        useHostDevice: false,
        allowDuplicateSongs: true,
        allowExplicitSongs: false,
        approveSongs: false,
      },
    };
  }

  setPartyName = (partyName) => {
    this.setState({ partyName });
  };

  setPartyDescription = (partyDescription) => {
    this.setState({ partyDescription });
  };

  setRuleValue = (ruleTag, value) => {
    this.setState({
      rules: {
        ...this.state.rules,
        [ruleTag]: value,
      },
    });
  };

  addAttendant = (attendant) => {
    this.setState({
      attendants: [
        ...this.state.attendants,
        attendant,
      ],
    });
  };

  removeAttendant = () => {

  };

  render() {
    const { partyCode, rules } = this.state;

    return (
      <div>
        <PageSection>
          <PartyInformation
            setPartyName={this.setPartyName}
            setPartyDescription={this.setPartyDescription}
            partyCode={partyCode}
          />
        </PageSection>
        <PageSection>
          <PartyRules setRuleValue={this.setRuleValue} defaultRuleValues={rules} />
        </PageSection>
        <PageSection>
          <Attendants addAttendant={this.addAttendant} removeAttendant={this.removeAttendant} />
        </PageSection>
      </div>
    );
  }
}

export default CreateParty;
