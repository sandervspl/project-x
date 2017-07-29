// dependencies
import React, { PropTypes } from 'react';
import cx from 'classnames';

// style
import './PageInner.styl';

const PageInner = ({ children, noNav }) => (
  <div
    className={cx(
      'page-inner',
      { 'no-nav': noNav },
    )}
  >
    {children}
  </div>
);

PageInner.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  noNav: PropTypes.bool,
};

PageInner.defaultProps = {
  noNav: false,
};

export default PageInner;
