// dependencies
import React, { PropTypes } from 'react';

// components
import Header from 'components/Header/Header';

// style
import './TitleWithLogo.styl';

const TitleWithLogo = ({ children }) => (
  <div className="title-with-logo__container">
    <Header textAlign="center" size="small">(logo)</Header>
    <Header textAlign="center" size="big"> {children} </Header>
  </div>
);

TitleWithLogo.propTypes = {
  children: PropTypes.string,
};

export default TitleWithLogo;
