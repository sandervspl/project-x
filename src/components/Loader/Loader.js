// dependencies
import React, { PropTypes } from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';

// style
import './Loader.styl';

const Loader = ({ active, color, size, inline, className }) => (
  <SemanticLoader
    active={active}
    className={`loader--${color} ${className}`}
    inverted={color === 'white'}
    size={size}
    inline={inline}
  />
);

Loader.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.oneOf(['grey', 'white', 'purple']),
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive']),
  inline: PropTypes.bool,
  className: PropTypes.string,
};

Loader.defaultProps = {
  active: false,
  color: 'grey',
  size: 'big',
  inline: false,
  className: '',
};

export default Loader;
