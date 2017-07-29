// dependencies
import React, { PropTypes } from 'react';

// components
import PageSection from 'components/PageSection/PageSection';
import DateButton from './DateButton/DateButton';
import TimeButton from './TimeButton/TimeButton';

// style
import './PartyDate.styl';

const PartyDate = ({ dates, onClick, type, setTime }) => (
  <PageSection customMargin=".75rem 0 0">
    <h3 className="party-date__header">
      { type === 'start' ? 'Starts on' : 'Ends on' }
    </h3>
    <PageSection row spaced customMargin="0">
      <DateButton dates={dates} onClick={onClick} type={type} />
      <TimeButton dates={dates} setTime={setTime} type={type} />
    </PageSection>
  </PageSection>
);

PartyDate.propTypes = {
  dates: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setTime: PropTypes.func,
};

export default PartyDate;
