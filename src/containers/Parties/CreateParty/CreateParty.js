// dependencies
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

// actions
import {
  createPartyProcess,
  resetCreateParty,
  fetchInitialParty,
  updatePartyValue,
} from 'ducks/modules/party/createParty';

// utils
import { isBeforeTime } from 'utils/date';

// components
import CalendarFullscreen from 'components/CalendarFullscreen/CalendarFullscreen';
import PageSection from 'components/PageSection/PageSection';
import Button from 'components/Button/Button';
import InputError from 'components/InputError/InputError';
import PageInner from 'components/PageInner/PageInner';
import PartyBannerImage from './PartyBannerImage/PartyBannerImage';
import PartyInformation from './PartyInformation/PartyInformation';
import PartyRules from './PartyRules/PartyRules';
import Attendants from './Attendants/Attendants';

// style
// import './Create.styl';

function mapStateToProps(state) {
  return {
    createParty: state.app.party.createParty,
  };
}

const mapDispatch = {
  createPartyProcess,
  resetCreateParty,
  fetchInitialParty,
  updatePartyValue,
};

class CreateParty extends PureComponent {
  static propTypes = {
    createParty: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.bool,
      errorMessage: PropTypes.string,
      party: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        startDate: PropTypes.instanceOf(Date),
        endDate: PropTypes.instanceOf(Date),
        settings: PropTypes.shape({}),
      }),
    }),
    createPartyProcess: PropTypes.func,
    resetCreateParty: PropTypes.func,
    fetchInitialParty: PropTypes.func,
    updatePartyValue: PropTypes.func,
  };

  state = {
    calendarActive: false,
    dateSelectMode: null,
  };

  async componentWillMount() {
    await this.props.fetchInitialParty();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.createParty.party.id === 0) {
      const today = this.createTodayDate();

      this.setPartyState({
        ...nextProps.createParty.party,
        title: '',
        description: '',
        startDate: today,
        endDate: today,
      });
    }
  }

  componentWillUpdate(nextProps) {
    // check if end date > start date -- else set end date = start date
    this.compareEndtoStartDate(nextProps);
  }

  componentWillUnmount() {
    this.props.resetCreateParty();
  }

  setPartyInformation = (name, value) => {
    this.setPartyState({
      [name]: value,
    });
  };

  setPartyState = (values) => {
    // debounce new value to store
    this.updateStore(values);
  };

  setRuleValue = (ruleTag, value) => {
    this.setPartyState({
      settings: {
        ...this.props.createParty.party.settings,
        [ruleTag]: value,
      },
    });
  };

  setDate = (pDate) => {
    const { dateSelectMode } = this.state;
    const { party } = this.props.createParty;

    // save current time when changing date or else it defaults to 12:00 AM
    const time = moment(party[dateSelectMode]).format('HH:mm:ss');
    const date = moment(pDate).format('YYYY-MM-DD');

    const curDate = moment(new Date());
    let newDate = moment(`${date} ${time}`, moment.ISO_8601);

    // if time is set before current time, change to current date
    if (isBeforeTime(newDate, curDate)) {
      newDate = moment(this.createTodayDate());
    }

    this.setState({
      calendarActive: false,
    });

    this.setPartyState({
      [dateSelectMode]: new Date(newDate.format()),
    });
  };

  setTime = (dateType, date) => {
    this.setPartyState({
      [dateType]: date,
    });
  };

  setDateSelectMode = (dateSelectMode) => {
    this.setState({
      calendarActive: true,
      dateSelectMode,
    });
  };

  updateStore = _.debounce((values) => {
    this.props.updatePartyValue(values);
  }, 250);

  compareEndtoStartDate = (nextProps) => {
    const { dateSelectMode } = this.state;
    const { party } = nextProps.createParty;

    // set end date to start date if end date is before start date
    if (dateSelectMode === 'startDate') {
      const dateDiff = moment(party.endDate).diff(moment(party.startDate), 'minutes', true);

      if (dateDiff < 0) {
        this.setPartyState({
          endDate: new Date(party.startDate),
        });
      }
    }
  };

  createTodayDate = () => {
    const curDate = new Date();
    const curHour = moment(curDate).hour();
    const curMinutes = moment(curDate).minute();
    const curSeconds = moment(curDate).seconds();

    // get closest valid minute
    let validMinute = _.range(curMinutes, 60).find(min => (min % 5 === 0 && min > curMinutes));

    // we will assume our current hour is valid by default
    let validHour = curHour;

    // if we can't find a correct time and it's past 55m
    // we go forwards an hour
    // this will also go to the next day if we skip to 00:00
    if (!validMinute && curMinutes >= 55) {
      validMinute = 0;
      validHour += 1;
    }

    // construct new date
    const deltaMinutes = validMinute - curMinutes;
    const deltaHours = validHour - curHour;

    return new Date(moment(curDate, moment.ISO_8601)
      .add(deltaHours, 'hours')
      .add(deltaMinutes, 'minutes')
      .subtract(curSeconds, 'seconds')
      .format());
  };

  clickHandler = (e) => {
    e.preventDefault();

    const { party } = this.props.createParty;
    const newParty = {
      party: _.omit(party, ['active', 'banner', 'bannerUrl', 'code', 'hostId', 'id']),
      id: party.id,
      banner: party.banner,
    };

    this.props.createPartyProcess(newParty);
  };

  addAttendant = () => {};

  removeAttendant = () => {};

  isFormValid = () => {
    const { title, description } = this.props.createParty.party;

    return !_.isEmpty(title) && !_.isEmpty(description);
  };

  render() {
    const { dateSelectMode, calendarActive } = this.state;
    const { loading, error, errorMessage } = this.props.createParty;
    const { startDate, endDate } = this.props.createParty.party;

    const today = new Date();
    const dates = { startDate, endDate };
    const selectedDate = this.props.createParty.party[dateSelectMode];
    const minDate = dateSelectMode === 'startDate' ? today : startDate;

    return (
      <PageInner>
        {
          calendarActive &&
            <CalendarFullscreen
              onSelect={this.setDate}
              selectedDate={selectedDate}
              minDate={minDate}
            />
        }

        <PartyBannerImage />

        <PageSection customMargin="7.5rem 0 0">
          <PartyInformation
            onChange={this.setPartyInformation}
            onClick={this.setDateSelectMode}
            dates={dates}
            setTime={this.setTime}
          />
        </PageSection>

        <PageSection>
          <PartyRules
            setRuleValue={this.setRuleValue}
          />
        </PageSection>

        <PageSection>
          <Attendants
            addAttendant={this.addAttendant}
            removeAttendant={this.removeAttendant}
          />
        </PageSection>

        <PageSection>
          { error && <InputError block>{ errorMessage }</InputError> }
          <Button
            color="purple"
            icon="plus"
            iconColor="white"
            fontSize="big"
            disabled={!this.isFormValid()}
            loading={loading}
            onClick={this.clickHandler}
          >
            CREATE PARTY
          </Button>
        </PageSection>
      </PageInner>
    );
  }
}

export default connect(mapStateToProps, mapDispatch)(CreateParty);
