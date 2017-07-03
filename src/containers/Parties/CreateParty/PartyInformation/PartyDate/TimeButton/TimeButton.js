/* eslint-disable */
// dependencies
import React, { PropTypes } from 'react';
import dateFormat from 'dateformat';

// components
import ButtonSideIcon from 'components/ButtonSideIcon/ButtonSideIcon';

// style
import './TimeButton.styl';

const TimeButton = ({ date, time, setTime }) => (
  <ButtonSideIcon
    color="purple-light"
    fontColor="purple"
    inverted
    iconLeft="clock-o"
    iconColorLeft="purple"
    iconRight="chevron-right"
    iconColorRight="purple-light"
    className="time-btn"
    // onClick={onClick}
  >
    {/* <span className="time-text">{ dateFormat(date, 'shortTime') }</span> */}
    <span className="time-text">{ time }</span>
  </ButtonSideIcon>
);

TimeButton.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  time: PropTypes.string,
  setTime: PropTypes.func,
};

export default TimeButton;
