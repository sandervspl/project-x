// dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// style
import './MiniButton.styl';

const MiniButton = ({ children, href, onClick }) => {
  if (href) {
    return (
      <Link to={href}>
        <div className="mini-btn btn-basic purple"> { children } </div>
      </Link>
    );
  }

  if (onClick) {
    return <div className="mini-btn purple" onClick={onClick}> { children } </div>;
  }

  return <div className="mini-btn purple"> { children } </div>;
};

MiniButton.propTypes = {
  children: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

MiniButton.defaultProps = {
  children: '',
};

export default MiniButton;
