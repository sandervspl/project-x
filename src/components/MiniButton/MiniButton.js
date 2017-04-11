// dependencies
import React, { PropTypes } from 'react';

// style
import './MiniButton.styl';

const MiniButton = ({ text, href }) => {
  if (href) {
    return (
      <a href={href}>
        <div className="mini-btn purple"> {text} </div>
      </a>
    );
  }
  return (
    <div className="mini-btn purple"> {text} </div>
  );
};

MiniButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
};

export default MiniButton;
