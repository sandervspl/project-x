// dependencies
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// components
import TimePicker from 'rc-time-picker';

// style
import 'rc-time-picker/assets/index.css';
import './TimeButton.styl';

class TimeButton extends Component {
  static propTypes = {
    date: PropTypes.shape({}).isRequired,
    setTime: PropTypes.func,
    type: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  // TODO: change end time to start time if end time is before start time
  componentWillUpdate(nextProps) {
    const { type } = this.props;

    const startDate = moment(nextProps.date.start);
    const endDate = moment(nextProps.date.end);

    const sd = {
      day: startDate.date(),
      month: startDate.month(),
    };

    const ed = {
      day: endDate.date(),
      month: endDate.month(),
    };

    if (type === 'start') {
      if (sd.month === ed.month && sd.day === ed.day) {
        console.log('check for time diff');
      }
    }

    // console.log(`TYPE: ${this.props.type}`);
    // console.log(`start date: ${startDate}`);
    // console.log(`date: ${date}`);
    // console.log(startDate === date);
  }

  onChange = (val) => {
    const { type, setTime } = this.props;

    // selected date from Moment object has underscore dangle
    // eslint-disable-next-line
    setTime(type, val._d);
  };

  onOpen = () => {
    this.setState({
      open: true,
    });
  };

  onClose = () => {
    this.setState({
      open: false,
    });
  };

  // OK Button for TimePicker
  OkButton = () => (
    <div className="ok-button" onClick={this.onClose}> OK </div>
  );

  // disable all but every 5 and 10 minutes of an hour
  // and disable unavailable time slots
  disabledMinutes = () => {
    const { type, date } = this.props;

    const startDate = moment(date.start).format('L');
    const startDateMinute = moment(date.start).minute();
    const startDateHour = moment(date.start).hour();

    const endDate = moment(date.end).format('L');
    const endDateHour = moment(date.end).hour();

    const curDate = moment(new Date()).format('L');
    const curMinute = moment(new Date()).minutes();
    const curHour = moment(new Date()).hour();

    let sameDate = curDate === startDate;
    let sameHour = curHour === startDateHour;
    let compareMinute = curMinute;

    if (type === 'end') {
      sameDate = startDate === endDate;
      sameHour = startDateHour === endDateHour;
      compareMinute = startDateMinute;
    }

    // 'start' button
    return Array.from({ length: 60 }, (_, index) => {
      if ((sameDate && sameHour && index <= compareMinute) || index % 5 !== 0) {
        return index;
      }

      return null;
    });
  };

  disabledHours = () => {
    const { type, date } = this.props;

    // grab hour of selected start date
    const curDate = moment(new Date()).format('L');
    const startDate = moment(date.start).format('L');

    const dateHour = moment(date.start).hour();
    // const dateDay = moment(dateStart).day();
    // const dateMonth = moment(dateStart).month();
    //
    const curHour = moment(new Date()).hour();
    // const curDay = moment(new Date()).day();
    // const curMonth = moment(new Date()).month();

    if (type === 'start') {
      if (curDate === startDate) {
        return Array.from({ length: 24 }, (_, index) => {
          if (index < curHour) {
            return index;
          }

          return null;
        });
      }

      return [];
    }

    // type 'end'
    const endDate = moment(date).format('L');

    if (startDate === endDate) {
      // put hours before selected date hour in array to be disabled from picker
      return Array.from({ length: 24 }, (_, index) => {
        if (index < dateHour) {
          return index;
        }

        return null;
      });
    }

    return [];
  };

  render() {
    const { date, type } = this.props;
    const { open } = this.state;

    let overlayVisible = '';
    if (open) {
      overlayVisible = 'overlay-visible';
    }

    return (
      <div className="time-btn-container">
        <div className={`time-picker__overlay ${overlayVisible}`} />
        <TimePicker
          showSecond={false}
          defaultValue={moment(date[type])}
          value={moment(date[type])}
          className="time-btn time-picker"
          onChange={this.onChange}
          format="hh:mm a"
          addon={this.OkButton}
          open={open}
          onOpen={this.onOpen}
          onClose={this.onClose}
          disabledMinutes={this.disabledMinutes}
          disabledHours={this.disabledHours}
          hideDisabledOptions
        />
      </div>
    );
  }
}

export default TimeButton;
