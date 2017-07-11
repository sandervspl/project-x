// dependencies
import React, { PropTypes } from 'react';

// style
import './AboutPage.styl';

const AboutPage = ({ children }) => (
  <div className="page-about__container"> {children} </div>
);

AboutPage.propTypes = {
  children: PropTypes.string,
};

export default AboutPage;
