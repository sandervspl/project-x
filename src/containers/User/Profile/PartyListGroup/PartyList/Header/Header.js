// dependencies
import React, { PropTypes } from 'react';
import { Icon } from 'semantic-ui-react';

// style
import './Header.styl';

const Header = ({ type }) => {
  const icon = type === 'hosted'
    ? <Icon name="home" size="big" />
    : <Icon name="ticket" size="big" />;

  return (
    <div className="party-type-header">
      {icon}
      <h3>{type}</h3>
      <a href="#" className="show-all-btn">Show all</a>
    </div>
  );
};

Header.propTypes = {
  type: PropTypes.oneOf(['hosted', 'attended']).isRequired,
};

export default Header;
