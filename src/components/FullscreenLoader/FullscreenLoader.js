// dependencies
import React, { PropTypes } from 'react';

// components
import Loader from 'components/Loader/Loader';
import PageFill from 'components/PageFill/PageFill';

// style
import './FullscreenLoader.styl';

const Fullscreenloader = ({ loaded }) => {
  const classlist = ['full-page-loader'];

  if (loaded) {
    classlist.push('loaded');
  }

  const clsName = classlist.join(' ');

  return (
    <PageFill inner={false} className={clsName}>
      <Loader
        className="page-loader"
        color="purple"
        size="massive"
        inline
        active
      />
      <h3>Setting up the party...</h3>
    </PageFill>
  );
};

Fullscreenloader.propTypes = {
  loaded: PropTypes.bool.isRequired,
};

export default Fullscreenloader;
