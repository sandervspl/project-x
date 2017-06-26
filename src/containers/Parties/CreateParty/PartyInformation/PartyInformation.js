// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// components
import Header from 'components/Header/Header';
import FormInput from 'components/FormInput/FormInput';
import PartyCodeDisplay from './PartyCodeDisplay/PartyCodeDisplay';

// style
// import './PartyInformation.styl';

const PartyInformation = ({ setPartyName, setPartyDescription, partyCode }) => (
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
    </Form>
  </div>
);

PartyInformation.propTypes = {
  setPartyName: PropTypes.func,
  setPartyDescription: PropTypes.func,
  partyCode: PropTypes.string,
};

export default PartyInformation;
