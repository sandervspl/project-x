/* eslint-disable */
// dependencies
import React, { PureComponent, PropTypes } from 'react';
import { isEmpty } from 'validator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

// actions
import * as createPartyActions from 'ducks/modules/party/createParty';

// components
import CalendarFullscreen from 'components/CalendarFullscreen/CalendarFullscreen';
import PageSection from 'components/PageSection/PageSection';
import Button from 'components/Button/Button';
import InputError from 'components/InputError/InputError';
import PartyBannerImage from './PartyBannerImage/PartyBannerImage';
import PartyInformation from './PartyInformation/PartyInformation';
import PartyRules from './PartyRules/PartyRules';
import Attendants from './Attendants/Attendants';

// style
// import './Create.styl';

class CreateParty extends PureComponent {
  static propTypes = {
    createParty: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      errorMessage: PropTypes.string,
    }),
    createPartyActions: PropTypes.shape({
      createPartyProcess: PropTypes.func,
      resetCreateParty: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    const today = new Date();

    this.state = {
      partyName: '',
      partyCode: '42069',
      partyDescription: '',
      partyBannerImage: '',
      date: {
        start: today,
        end: today,
      },
      time: {
        start: dateFormat(today, 'shortTime'),
        end: dateFormat(today, 'shortTime'),
      },
      attendants: [],
      rules: {
        useHostDevice: false,
        allowDuplicateSongs: true,
        allowExplicitSongs: false,
        approveSongs: false,
      },
      allowCreate: false,
      calendarActive: false,
      dateSelectMode: null,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.allowCreate &&
      !isEmpty(nextState.partyName) &&
      !isEmpty(nextState.partyDescription)
    ) {
      this.setState({ allowCreate: true });
    } else if (nextState.allowCreate &&
      (isEmpty(nextState.partyName) || isEmpty(nextState.partyDescription))
    ) {
      this.setState({ allowCreate: false });
    }
  }

  componentWillUnmount() {
    this.props.createPartyActions.resetCreateParty();
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

  clickHandler = (e) => {
    e.preventDefault();

    const { partyName, partyDescription } = this.state;
    const { createPartyProcess } = this.props.createPartyActions;

    createPartyProcess(partyName, partyDescription);
  };

  setDateSelectMode = (e, dateSelectMode) => {
    e.preventDefault();

    this.setState({
      calendarActive: true,
      dateSelectMode,
    });
  };

  selectStartDate = (date) => {
    this.setState({
      calendarActive: false,
      date: {
        ...this.state.date,
        start: date,
      },
    });
  };

  selectEndDate = (date) => {
    this.setState({
      calendarActive: false,
      date: {
        ...this.state.date,
        end: date,
      },
    });
  };

  setTime = (type, time) => {
    const date = dateFormat(this.state.date[type], 'isoDate');
    const dateWithTime = `${date} ${time}`;

    this.setState({
      date: {
        ...this.state.date,
        [type]: dateWithTime,
      },
      time: {
        ...this.state.time,
        [type]: time,
      },
    });
  };

  render() {
    const { partyCode, rules, allowCreate, calendarActive, dateSelectMode, date, time } = this.state;
    const { loading, error, errorMessage } = this.props.createParty;

    return (
      <div>
        { calendarActive && <CalendarFullscreen
          onSelect={dateSelectMode === 'start' ? this.selectStartDate : this.selectEndDate}
          selected={dateSelectMode === 'start' ? date.start : date.end}
        /> }

        <PartyBannerImage />

        <PageSection customMargin="7.5rem 0 0">
          <PartyInformation
            setPartyName={this.setPartyName}
            setPartyDescription={this.setPartyDescription}
            partyCode={partyCode}
            onClick={this.setDateSelectMode}
            date={date}
            time={time}
            setTime={this.setTime}
          />
        </PageSection>

        <PageSection>
          <PartyRules
            setRuleValue={this.setRuleValue}
            defaultRuleValues={rules}
          />
        </PageSection>

        <PageSection>
          <Attendants
            addAttendant={this.addAttendant}
            removeAttendant={this.removeAttendant}
          />
        </PageSection>

        <PageSection>
          { error && <InputError block> { errorMessage } </InputError> }
          <Button
            color="purple"
            icon="plus"
            iconColor="white"
            fontSize="big"
            disabled={!allowCreate}
            loading={loading}
            onClick={this.clickHandler}
          >
            CREATE PARTY
          </Button>
        </PageSection>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    createParty: state.app.party.createParty,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createPartyActions: bindActionCreators(createPartyActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateParty);
