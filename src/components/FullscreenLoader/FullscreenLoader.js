// dependencies
import React, { PropTypes } from 'react';

// style
import './FullscreenLoader.styl';


const Loader = ({ loaded }) => {
  const cls = loaded ? 'page-fill loader loaded' : 'page-fill loader';

  return (
    <div className={cls}>
      <img src={spinner} />
      <h3>Setting up the party...</h3>
    </div>
  );
};

Loader.propTypes = {
  loaded: PropTypes.bool.isRequired,
};

export default Loader;
