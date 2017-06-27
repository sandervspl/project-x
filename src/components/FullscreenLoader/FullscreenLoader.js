// dependencies
import React, { PropTypes } from 'react';

// components
import Loader from 'components/Loader/Loader';

// style
import './FullscreenLoader.styl';

const Fullscreenloader = ({ loaded }) => {
  const cls = loaded ? 'page-fill full-page-loader loaded' : 'page-fill full-page-loader';

  return (
    <div className={cls}>
      <Loader
        className="page-loader"
        color="purple"
        size="massive"
        inline
        active
      />
      <h3>Setting up the party...</h3>
    </div>
  );
};

Fullscreenloader.propTypes = {
  loaded: PropTypes.bool.isRequired,
};

export default Fullscreenloader;
