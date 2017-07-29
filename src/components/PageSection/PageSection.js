// dependencies
import React, { PropTypes } from 'react';
import cx from 'classnames';

// style
import './PageSection.styl';

const PageSection = ({ children, customMargin, row, spaced }) => {
  const blockName = 'page-section';
  const clsName = cx(
    blockName,
    {
      [`${blockName}--row`]: row,
      [`${blockName}--spaced`]: spaced,
    },
  );

  return (
    <div
      className={clsName}
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
