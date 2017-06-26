// dependencies
import React, { PropTypes } from 'react';

// style
import './PageSection.styl';

const PageSection = ({ children, customMargin }) => (
  <div className="page-section" style={customMargin && { margin: customMargin }}>{ children }</div>
);

PageSection.propTypes = {
  children: PropTypes.element,
  customMargin: PropTypes.string,
};

export default PageSection;
