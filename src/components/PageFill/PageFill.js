// dependencies
import React, { PropTypes } from 'react';
import cx from 'classnames';

// components
import PageInner from 'components/PageInner/PageInner';

// style
import './PageFill.styl';

const PageFill = ({ children, inner, flow, className, id }) => {
  const blockName = 'page-fill';
  const clsName = cx(
    `${blockName}__container`,
    {
      [`${blockName}__container--flow`]: flow,
    },
    className,
  );

  return (
    <div id={id} className={clsName}>
      {do { /* eslint-disable */
        if (inner) {
          <PageInner> {children} </PageInner>;
        } else {
          children;
        }
        /* eslint-enable */
      }}
    </div>
  );
};

PageFill.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  inner: PropTypes.bool,
  flow: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
};

PageFill.defaultProps = {
  inner: true,
  flow: false,
  className: '',
  id: null,
};

export default PageFill;
