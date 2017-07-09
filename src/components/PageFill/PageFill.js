// dependencies
import React, { PropTypes } from 'react';

// components
import PageInner from 'components/PageInner/PageInner';

// style
import './PageFill.styl';

const PageFill = ({ children, inner, flow }) => (
  <div className={`page-fill__container ${flow ? 'page-fill__container--flow' : ''}`}>
    {do { /* eslint-disable */
      if (inner) {
        <PageInner> { children } </PageInner>;
      } else {
        children
      }
      /* eslint-enable */
    }}
  </div>
);

PageFill.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  inner: PropTypes.bool,
  flow: PropTypes.bool,
};

PageFill.defaultProps = {
  inner: true,
  flow: false,
};

export default PageFill;
