// dependencies
import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';

// components
import PageInner from 'components/PageInner/PageInner';

// style
import './PageFill.styl';

const PageFill = ({ children, inner, flow, className, id }) => {
  const block = 'page-fill';
  const classlist = [`${block}__container`];

  if (flow) classlist.push(`${block}__container--flow`);
  if (!isEmpty(className)) classlist.push(className);

  const clsName = classlist.join(' ');

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
