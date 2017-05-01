// dependencies
import React, { Component, PropTypes } from 'react';
import { Sidebar, Icon, Menu } from 'semantic-ui-react';
// import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// components
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Authorized from 'components/Authorized/Authorized';

// actions
import * as userActions from 'ducks/modules/user/getUser';

// style
import './SidebarMenu.styl';

// sidebar items
const ItemTop = ({ toggleOpen }) => (
  <Menu.Item name="home" className="item-top">
    <div className="item-left">
      <a href="#" className="item-text-language">ENGLISH</a>
    </div>
    <div className="item-right" onClick={toggleOpen}>
      <span className="item-text sidebar-close-text">CLOSE</span>
      <Icon name="close" fitted />
    </div>
  </Menu.Item>
);
ItemTop.propTypes = {
  toggleOpen: PropTypes.func,
};

const ItemLogOut = ({ logout }) => {
  function handleClick() {
    // TODO: add modal: are you sure? Y/N
    logout();
  }

  return (
    <Menu.Item name="logout" onClick={handleClick}>
      <Icon name="shutdown" fitted className="sidebar-icon" />
      <span className="item-text">Logout</span>
    </Menu.Item>
  );
};
ItemLogOut.propTypes = {
  logout: PropTypes.func,
};

const ItemTwo = () => (
  <Menu.Item name="home">
    <Icon name="home" fitted className="sidebar-icon" />
    <span className="item-text">Item two</span>
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
            <ItemTop toggleOpen={this.toggleOpen} />
            <Authorized>
              <ItemLogOut logout={unauthorize} />
            </Authorized>
            <ItemTwo />
          </Sidebar>
          <Sidebar.Pusher>
            <NavigationBar toggleSidebar={this.toggleOpen} />
            {children}
          </Sidebar.Pusher>
          <div className="pushable-overlay" />
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarMenu;
