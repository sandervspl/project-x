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
  onChange,
  partyCode,
  onClick,
  date,
  setTime,
}) => (
  <div className="full-width">
    <Header icon="music" iconColor="purple-medium">Party information</Header>

    <Form className="party-information">
      <FormInput
        type="text"
        placeholder="Party name"
        name="partyName"
        onChange={onChange}
      />

      <PartyCodeDisplay code={partyCode} />

      <FormInput
        type="textarea"
        placeholder="Party description"
        name="partyDescription"
        smallMarginTop
        onChange={onChange}
      />

      <PartyDate type="start" date={date} setTime={setTime} onClick={onClick} />
      <PartyDate type="end" date={date} setTime={setTime} onClick={onClick} />
    </Form>
  </div>
);


PartyInformation.propTypes = {
  onChange: PropTypes.func,
  partyCode: PropTypes.string,
  onClick: PropTypes.func,
  date: PropTypes.shape({}),
  setTime: PropTypes.func,
};

export default PartyInformation;
