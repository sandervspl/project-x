// dependencies
import React, { PureComponent } from 'react';
import { isEmpty } from 'validator';

// components
import PageSection from 'components/PageSection/PageSection';
import Button from 'components/Button/Button';
import PartyInformation from './PartyInformation/PartyInformation';
import PartyRules from './PartyRules/PartyRules';
import Attendants from './Attendants/Attendants';
import PartyBannerImage from './PartyBannerImage/PartyBannerImage';

// style
// import './Create.styl';

class CreateParty extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      partyName: '',
      partyCode: '42069',
      partyDescription: '',
      partyBannerImage: '',
      attendants: [],
      rules: {
        useHostDevice: false,
        allowDuplicateSongs: true,
        allowExplicitSongs: false,
        approveSongs: false,
      },
      allowCreate: false,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.allowCreate && !isEmpty(nextState.partyName)) {
      this.setState({ allowCreate: true });
    } else if (nextState.allowCreate && isEmpty(nextState.partyName)) {
      this.setState({ allowCreate: false });
    }
  }

  setPartyName = (partyName) => {
    this.setState({ partyName: partyName.trim() });
  };

  setPartyDescription = (partyDescription) => {
    this.setState({ partyDescription: partyDescription.trim() });
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
    const { partyCode, rules, allowCreate } = this.state;

    return (
      <div>
        <PartyBannerImage />

        <PageSection customMargin="7.5rem 0 0">
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
          <Attendants
            addAttendant={this.addAttendant}
            removeAttendant={this.removeAttendant}
          />
        </PageSection>

        <PageSection>
          <Button
            color="purple"
            icon="plus"
            iconColor="white"
            iconSize="big"
            textAlign="center"
            fontSize="big"
            disabled={!allowCreate}
          >
            CREATE PARTY
          </Button>
        </PageSection>
      </div>
    );
  }
}

export default CreateParty;
