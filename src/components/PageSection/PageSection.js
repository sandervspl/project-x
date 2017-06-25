// dependencies
import React, { PropTypes } from 'react';

// style
import './PageSection.styl';

const PageSection = ({ children }) => (
  <div className="page-section">{ children }</div>
);

PageSection.propTypes = {
  children: PropTypes.element,
};

export default PageSection;
