// dependencies
import React, { PropTypes } from 'react';

// style
import './PageSection.styl';

const PageSection = ({ children, customMargin, row }) => {
  let className = 'page-section';
  if (row) className += ' page-section--row';

  return (
    <div
      className={className}
      style={customMargin && { margin: customMargin }}
    >
      { children }
    </div>
  );
};

PageSection.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  customMargin: PropTypes.string,
  row: PropTypes.bool,
};

PageSection.defaultProps = {
  row: false,
};

export default PageSection;
