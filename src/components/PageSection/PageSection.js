// dependencies
import React, { PropTypes } from 'react';

// style
import './PageSection.styl';

const PageSection = ({ children, customMargin, row, spaced }) => {
  let className = 'page-section';
  if (row) className += ' page-section--row';
  if (spaced) className += ' page-section--spaced';

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
  spaced: PropTypes.bool,
};

PageSection.defaultProps = {
  row: false,
  spaced: false,
};

export default PageSection;
