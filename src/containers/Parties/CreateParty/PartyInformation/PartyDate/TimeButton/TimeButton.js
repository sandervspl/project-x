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
    date: PropTypes.instanceOf(Date).isRequired,
    setTime: PropTypes.func,
    type: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
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
  disabledMinutes = () => Array.from({ length: 60 }, (_, index) => {
    if (index % 10 === 0 || index % 5 === 0) {
      return null;
    }

    return index;
  });

  render() {
    const { date } = this.props;
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
          defaultValue={moment(date)}
          value={moment(date)}
          className="time-btn time-picker"
          onChange={this.onChange}
          format="hh:mm a"
          addon={this.OkButton}
          open={open}
          onOpen={this.onOpen}
          onClose={this.onClose}
          disabledMinutes={this.disabledMinutes}
          hideDisabledOptions
          use12Hours
        />
      </div>
    );
  }
}

export default TimeButton;
