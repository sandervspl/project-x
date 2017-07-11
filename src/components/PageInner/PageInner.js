// dependencies
import React, { PropTypes } from 'react';

// style
import './PageInner.styl';

const PageInner = ({ children, noNav }) => (
  <div className={`page-inner ${noNav ? 'no-nav' : ''}`}> { children } </div>
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
