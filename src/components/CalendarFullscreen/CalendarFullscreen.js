// dependencies
import React, { PropTypes } from 'react';

// components
import InfiniteCalendar from 'react-infinite-calendar';

// style
import 'react-infinite-calendar/styles.css';
import './CalendarFullscreen.styl';

const theme = {
  // accentColor: '#257ae3',
  headerColor: '#7F5F9B',
  floatingNav: {
    background: '#1F1F21',
    chevron: '#FFA726',
    color: '#FFF',
  },
  selectionColor: '#7F5F9B',
  textColor: {
    active: '#FFF',
    default: '#333',
  },
  todayColor: '#A584C1',
  weekdayColor: '#D9CEE3',
};

const CalendarFullscreen = ({ onSelect, selectedDate, minDate }) => (
  <div className="calendar-overlay">
    <InfiniteCalendar
      width={window.innerWidth}
      height={window.innerHeight}
      selected={selectedDate}
      minDate={minDate}
      theme={theme}
      onSelect={onSelect}
      className="px-calendar"
    />
  </div>
);

CalendarFullscreen.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
};

CalendarFullscreen.defaultProps = {
  selectedDate: new Date(),
  minDate: new Date(),
};

export default CalendarFullscreen;
