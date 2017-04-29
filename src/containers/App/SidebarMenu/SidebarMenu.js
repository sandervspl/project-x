// dependencies
import React, { Component, PropTypes } from 'react';
import { Sidebar, Icon, Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

// components
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Authorized from 'components/Authorized/Authorized';

// style
import './SidebarMenu.styl';

// sidebar items
const ItemLogo = () => {
  function handleClick() {
    browserHistory.push('/');
  }

  return (
    <Menu.Item name="home" onClick={handleClick} className="logo-item">
      <Icon name="music" fitted className="sidebar-icon logo" />
    </Menu.Item>
  );
};

const ItemLogOut = () => {
  function handleClick() {
    console.log('log out');
  }

  return (
    <Menu.Item name="logout" onClick={handleClick}>
      <Icon name="shutdown" fitted className="sidebar-icon" />
      Logout
    </Menu.Item>
  );
};

const ItemTwo = () => (
  <Menu.Item name="home">
    <Icon name="home" fitted className="sidebar-icon" />
    Item two
  </Menu.Item>
);

// sidebar
class SidebarMenu extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  state = {
    open: false,
  };

  toggleOpen = () => this.setState({ open: !this.state.open });

  render() {
    const { children } = this.props;
    const { open } = this.state;

    return (
      <div className="page-fill" id="app" role="app">
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="slide along"
            width="wide"
            visible={open}
            icon="labeled"
            vertical
            inverted
            className="sidebar-inner"
          >
            <ItemLogo />
            <Authorized>
              <ItemLogOut />
            </Authorized>
            <ItemTwo />
          </Sidebar>
          <Sidebar.Pusher>
            <NavigationBar toggleSidebar={this.toggleOpen} />
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarMenu;
