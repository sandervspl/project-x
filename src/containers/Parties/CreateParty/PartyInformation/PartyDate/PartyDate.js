// dependencies
import React, { PropTypes } from 'react';

// components
import PageSection from 'components/PageSection/PageSection';
import DateButton from './DateButton/DateButton';
import TimeButton from './TimeButton/TimeButton';

// style
import './PartyDate.styl';

const PartyDate = ({ date, time, onClick, type, setTime }) => (
  <PageSection customMargin=".75rem 0 0">
    <h3 className="party-date-header">
      { type === 'start' ? 'Starts on' : 'Ends on' }
    </h3>
    <PageSection row spaced customMargin="0">
      <DateButton date={date} onClick={onClick} type={type} />
      <TimeButton date={date} time={time} setTime={setTime} />
    </PageSection>
  </PageSection>
);

PartyDate.propTypes = {
  date: PropTypes.instanceOf(Date),
  time: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setTime: PropTypes.func,
};

export default PartyDate;
