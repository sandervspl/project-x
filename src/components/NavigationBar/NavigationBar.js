// dependencies
import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router';

// style
import './NavigationBar.styl';

const NavigationBar = () => (
  <div>
    <Menu attached="top" color="black" className="top-nav">
      <Dropdown simple item icon="content" closeOnBlur>
        <Dropdown.Menu>
          <Dropdown.Item>item 1</Dropdown.Item>
          <Dropdown.Item>item 2</Dropdown.Item>
          <Dropdown.Item>item 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item name="Project-X" className="title">
        <Link to="/">Project-x</Link>
      </Menu.Item>
    </Menu>
  </div>
);

export default NavigationBar;
