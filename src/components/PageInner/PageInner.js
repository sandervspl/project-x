// dependencies
import React, { PropTypes } from 'react';

// style
import './PageInner.styl';

const PageInner = ({ children }) => (
  <div className="page-inner"> { children } </div>
);

PageInner.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
};

export default PageInner;
