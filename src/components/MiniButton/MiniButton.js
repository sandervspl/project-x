// dependencies
import React, { PropTypes } from 'react';

// style
import './MiniButton.styl';

const MiniButton = ({ text, href, action }) => {
  if (href) {
    return (
      <a href={href}>
        <div className="mini-btn btn-basic purple"> {text} </div>
      </a>
    );
  }

  if (action) {
    return <div className="mini-btn purple" onClick={action}> {text} </div>;
  }

  return <div className="mini-btn purple"> {text} </div>;
};

MiniButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  action: PropTypes.func,
};

export default MiniButton;
