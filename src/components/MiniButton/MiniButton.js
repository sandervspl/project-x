// dependencies
import React, { PropTypes } from 'react';

// style
import './MiniButton.styl';

const MiniButton = ({ children, href, action }) => {
  if (href) {
    return (
      <a href={href}>
        <div className="mini-btn btn-basic purple"> { children } </div>
      </a>
    );
  }

  if (action) {
    return <div className="mini-btn purple" onClick={action}> { children } </div>;
  }

  return <div className="mini-btn purple"> { children } </div>;
};

MiniButton.propTypes = {
  children: PropTypes.string,
  href: PropTypes.string,
  action: PropTypes.func,
};

MiniButton.defaultProps = {
  children: '',
};

export default MiniButton;
