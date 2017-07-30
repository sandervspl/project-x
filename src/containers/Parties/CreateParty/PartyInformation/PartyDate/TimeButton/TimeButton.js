// dependencies
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

// components
import TimePicker from 'rc-time-picker';

// utils
import { sameDate, sameHour, isBeforeTime } from 'utils/date';

// style
import 'rc-time-picker/assets/index.css';
import './TimeButton.styl';

class TimeButton extends Component {
  static propTypes = {
    dates: PropTypes.shape({}).isRequired,
    setTime: PropTypes.func,
    type: PropTypes.oneOf(['startDate', 'endDate']),
  };

  state = {
    open: false,
  };

  componentWillUpdate(nextProps) {
    const { type, setTime } = this.props;

    const startDate = moment(nextProps.dates.startDate);
    const endDate = moment(nextProps.dates.endDate);

    // check if dates are equal, and start time is before end time
    // else change end time to start time
    if (type === 'startDate') {
      if (sameDate(startDate, endDate) && isBeforeTime(endDate, startDate)) {
        setTime('endDate', new Date(startDate));
      }
    }
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
    <div
      className="ok-button"
      onClick={this.onClose}
    >
      OK
    </div>
  );

  // disable all but every 5 and 10 minutes of an hour
  // and disable unavailable time slots
  disabledMinutes = () => {
    const { type, dates } = this.props;

    const startDate = moment(dates.startDate);
    const endDate = moment(dates.endDate);
    const curDate = moment(new Date());
    const startDateMinute = startDate.minute();
    const curMinute = curDate.minute();

    let isSameDate = sameDate(curDate, startDate);
    let isSameHour = sameHour(curDate, startDate);
    let compareMinute = curMinute;

    if (type === 'endDate') {
      isSameDate = sameDate(startDate, endDate);
      isSameHour = sameHour(startDate, endDate);
      compareMinute = startDateMinute;
    }

    // 'start' button
    return Array.from({ length: 60 }, (_, index) => {
      if ((isSameDate && isSameHour && index <= compareMinute) || index % 5 !== 0) {
        return index;
      }

      return null;
    });
  };

  disabledHours = () => {
    const { type, dates } = this.props;

    // grab hour of selected start date
    const curDate = moment(new Date());
    const startDate = moment(dates.startDate);

    const dateHour = moment(dates.startDate).hour();
    const curHour = moment(new Date()).hour();

    if (type === 'startDate') {
      if (sameDate(curDate, startDate)) {
        return Array.from({ length: 24 }, (_, index) => {
          if (index < curHour) {
            return index;
          }

          return null;
        });
      }

      return [];
    }

    // type 'endDate'
    const endDate = moment(dates.endDate);

    if (sameDate(startDate, endDate)) {
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
    const { dates, type } = this.props;
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
          defaultValue={moment(dates[type])}
          value={moment(dates[type])}
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
