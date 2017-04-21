// dependencies
import React, { PropTypes } from 'react';
import { Loader as LoaderSemantic } from 'semantic-ui-react';

// style
import './FullscreenLoader.styl';

const Loader = ({ loaded }) => {
  const cls = loaded ? 'page-fill full-page-loader loaded' : 'page-fill full-page-loader';

  return (
    <div className={cls}>
      <LoaderSemantic
        className="page-loader purple-loader"
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
