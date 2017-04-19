// dependencies
import React, { PropTypes } from 'react';
import { Loader as LoaderSemantic } from 'semantic-ui-react';

// style
import './FullscreenLoader.styl';

const Loader = ({ loaded }) => {
  const cls = loaded ? 'page-fill loader loaded' : 'page-fill loader';

  return (
    <div className={cls}>
      <LoaderSemantic
        className="px-loader"
        size="massive"
        inline
        active
      />
      <h3>Setting up the party...</h3>
    </div>
  );
};

Loader.propTypes = {
  loaded: PropTypes.bool.isRequired,
};

export default Loader;
