// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// components
import Header from 'components/Header/Header';
import FormInput from 'components/FormInput/FormInput';
import PartyCodeDisplay from './PartyCodeDisplay/PartyCodeDisplay';
import PartyDate from './PartyDate/PartyDate';

// style
import './PartyInformation.styl';

const PartyInformation = ({
  setPartyName,
  setPartyDescription,
  partyCode,
  onClick,
  date,
  time,
  setTime,
}) => (
  <div className="full-width">
    <Header icon="music" iconColor="purple-medium">Party information</Header>

    <Form className="party-information">
      <FormInput
        type="text"
        placeholder="Party name"
        name="partyname"
        onChange={setPartyName}
      />

      <PartyCodeDisplay code={partyCode} />

      <FormInput
        type="textarea"
        placeholder="Party description"
        name="partydescription"
        smallMarginTop
        onChange={setPartyDescription}
      />

      <PartyDate date={date.start} time={time.start} setTime={setTime} onClick={onClick} type="start" />
      <PartyDate date={date.end} time={time.end} setTime={setTime} onClick={onClick} type="end" />
    </Form>
  </div>
);


PartyInformation.propTypes = {
  setPartyName: PropTypes.func,
  setPartyDescription: PropTypes.func,
  partyCode: PropTypes.string,
  onClick: PropTypes.func,
  date: PropTypes.shape({}),
  time: PropTypes.shape({}),
  setTime: PropTypes.func,
};

export default PartyInformation;
