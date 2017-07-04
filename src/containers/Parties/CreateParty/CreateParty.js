// dependencies
import React, { PureComponent, PropTypes } from 'react';
import { isEmpty } from 'validator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

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

  setDate = (date) => {
    const { dateSelectMode } = this.state;

    // Save current time when changing date or else it defaults to 12:00 AM
    const tt = moment(this.state.date[dateSelectMode]).format('HH:mm:ss');
    const dd = moment(date).format('YYYY-MM-DD');

    const newDate = moment(`${dd} ${tt}`, moment.ISO_8601).format();

    this.setState({
      calendarActive: false,
      date: {
        ...this.state.date,
        [dateSelectMode]: new Date(newDate),
      },
    });
  };

  setTime = (type, date) => {
    this.setState({
      date: {
        ...this.state.date,
        [type]: date,
      },
    });
  };

  setDateSelectMode = (dateSelectMode) => {
    this.setState({
      calendarActive: true,
      dateSelectMode,
    });
  };

  clickHandler = (e) => {
    e.preventDefault();

    const { partyName, partyDescription } = this.state;
    const { createPartyProcess } = this.props.createPartyActions;

    createPartyProcess(partyName, partyDescription);
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
    const {
      partyCode,
      rules,
      allowCreate,
      calendarActive,
      dateSelectMode,
      date,
      time,
    } = this.state;
    const { loading, error, errorMessage } = this.props.createParty;

    return (
      <div>
        { calendarActive && <CalendarFullscreen
          type={dateSelectMode}
          onSelect={this.setDate}
          selectedDate={date[dateSelectMode]}
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
