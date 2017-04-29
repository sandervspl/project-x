// dependencies
import React, { PropTypes } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

// style
import './NavigationBar.styl';

const NavigationBar = ({ toggleSidebar }) => (
  <nav id="navbar">
    <Menu attached="top" color="black" className="top-nav">
      <button onClick={toggleSidebar}>
        <Icon className="sidebar-toggle" name="content" inverted />
      </button>
      <Menu.Item name="Project-X" className="title">
        <Link to="/">Project-x</Link>
      </Menu.Item>
    </Menu>
  </nav>
);

NavigationBar.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default NavigationBar;
