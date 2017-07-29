// dependencies
import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

// components
import Header from 'components/Header/Header';
import FormInput from 'components/FormInput/FormInput';
import PartyCodeDisplay from './PartyCodeDisplay/PartyCodeDisplay';
import PartyDate from './PartyDate/PartyDate';

// style
// import './PartyInformation.styl';

const PartyInformation = ({
  onChange,
  onClick,
  dates,
  setTime,
}) => (
  <div className="full-width">
    <Header icon="music" iconColor="purple-medium">Party information</Header>

    <Form className="party-information">
      <PartyCodeDisplay />

      <FormInput
        type="text"
        placeholder="Party title"
        name="title"
        onChange={onChange}
      />

      <FormInput
        type="textarea"
        placeholder="Party description"
        name="description"
        smallMarginTop
        onChange={onChange}
      />

      <PartyDate type="startDate" dates={dates} setTime={setTime} onClick={onClick} />
      <PartyDate type="endDate" dates={dates} setTime={setTime} onClick={onClick} />
    </Form>
  </div>
);


PartyInformation.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  dates: PropTypes.shape({}),
  setTime: PropTypes.func,
};

export default PartyInformation;
