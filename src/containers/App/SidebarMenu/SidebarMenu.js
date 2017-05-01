// dependencies
import React, { Component, PropTypes } from 'react';
import { Sidebar, Icon, Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// components
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Authorized from 'components/Authorized/Authorized';

// actions
import * as userActions from 'ducks/modules/user/getUser';

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

const ItemLogOut = ({ logout }) => {
  function handleClick() {
    // TODO: add modal: are you sure? Y/N
    logout();
  }

  return (
    <Menu.Item name="logout" onClick={handleClick}>
      <Icon name="shutdown" fitted className="sidebar-icon" />
      Logout
    </Menu.Item>
  );
};
ItemLogOut.propTypes = {
  logout: PropTypes.func,
};

const ItemTwo = () => (
  <Menu.Item name="home">
    <Icon name="home" fitted className="sidebar-icon" />
    Item two
  </Menu.Item>
);

// sidebar
@connect(null, userActions)
class SidebarMenu extends Component {
  static propTypes = {
    children: PropTypes.element,
    unauthorize: PropTypes.func,
  };

  state = {
    open: false,
  };

  toggleOpen = () => this.setState({ open: !this.state.open });

  render() {
    const { children, unauthorize } = this.props;
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
              <ItemLogOut logout={unauthorize} />
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
