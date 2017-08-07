// dependencies
import React, { PropTypes } from 'react';

// components
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import PartyTitle from './PartyTitle/PartyTitle';

// style
import './PartyBanner.styl';

const PartyBanner = ({ image, title, code }) => (
  <div
    className="party-banner__container"
    style={{ backgroundImg: `url(${image})` }}
  >
    <PartyTitle title={title} />
    <TextWithIcon
      icon="ticket"
      iconColor="white"
      textClassName="party-banner__code"
    >
      { code }
    </TextWithIcon>
  </div>
);

PartyBanner.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  image: PropTypes.string,
};

PartyBanner.defaultProps = {
  image: '',
};

export default PartyBanner;
